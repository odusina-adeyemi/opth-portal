import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { writeLogEntry } from '../../../../lib/utils/logging';
import {
  FileResponse,
  FileUploadInput,
} from '../../../../constants/types/types';
import { generateSignedUrl } from '../../../../lib/utils/serverSideUtils';

type UploadFileMutationProps = {
  clinicId: string;
  documentName: string;
  file: FileUploadInput;
  providerId: string;
};

const storage = new Storage();
const bucketName = process.env.OBJECT_STORAGE_BUCKET_NAME ?? '';

export const fileResolver = {
  Query: {
    archivedFiles: async (_parent: any, _args: any, context: any) => {
      try {
        const fileRecords: FileResponse[] = await context.prisma.file.findMany({
          where: {
            isArchived: true,
          },
          include: { clinic: true, provider: true, user: true },
        });

        let fileRecordsWithSignedUrls = [];

        if (fileRecords.length) {
          fileRecordsWithSignedUrls = await Promise.all(
            fileRecords.map(async (fileRecord: FileResponse) => {
              const { url: permanentUrl } = fileRecord;
              const fileName = permanentUrl.split(`${bucketName}/`)[1]; // Extract file name from permanentUrl

              const [signedUrl] = await generateSignedUrl(
                storage,
                bucketName,
                fileName,
              );

              return {
                ...fileRecord,
                signedUrl,
              };
            }),
          );
          return fileRecordsWithSignedUrls;
        }

        return [];
      } catch (error) {
        writeLogEntry('Error fetching archived files: ', 'NOTICE');
        throw new Error('Failed to fetch archived files');
      }
    },
    file: async (_parent: any, { id }: { id: string }, context: any) => {
      const fileRecord = await context.prisma.file.findUnique({
        where: {
          id,
        },
        include: { clinic: true, provider: true, user: true },
      });

      if (fileRecord) {
        const { url: permanentUrl } = fileRecord;
        const fileName = permanentUrl.split(`${bucketName}/`)[1]; // Extract file name from permanentUrl
        const [signedUrl] = await generateSignedUrl(
          storage,
          bucketName,
          fileName,
        );

        return {
          ...fileRecord,
          signedUrl,
        };
      }
      return null;
    },
    providerClinicFile: async (
      _parent: any,
      {
        clinicId,
        documentName,
        providerId,
      }: { clinicId: string; documentName: string; providerId: string },
      context: any,
    ) => {
      try {
        const fileRecord = await context.prisma.file.findFirst({
          where: {
            AND: [{ clinicId }, { name: documentName }, { providerId }],
          },
        });

        if (fileRecord) {
          const { url: permanentUrl } = fileRecord;
          const fileName = permanentUrl.split(`${bucketName}/`)[1]; // Extract file name from permanentUrl
          const [signedUrl] = await generateSignedUrl(
            storage,
            bucketName,
            fileName,
          );

          return {
            ...fileRecord,
            signedUrl,
          };
        }
        return null;
      } catch (error) {
        writeLogEntry(
          `Error fetching provider clinic file: ${bucketName}`,
          'NOTICE',
        );
        throw new Error('Failed to fetch provider clinic file');
      }
    },
    // this fetches any files that are tied to a clinic and provider e.g. consent form, W9, demographics, etc.
    providerClinicFiles: async (
      _parent: any,
      { clinicId, providerId }: { clinicId: string; providerId: string },
      context: any,
    ) => {
      return await context.prisma.file.findMany({
        where: {
          clinicId,
          providerId,
        },
      });
    },
  },
  Mutation: {
    async uploadFile(
      _parent: any,
      { clinicId, documentName, file, providerId }: UploadFileMutationProps,
      context: any,
    ) {
      const { filename, mimetype, content } = file;

      // Decode Base64 string
      const buffer = Buffer.from(content, 'base64');

      // Define the path for the uploads directory and ensure it exists
      const uploadDir = path.join(__dirname, '..', 'uploads');

      // Define the path for the temporary file
      const tempFilePath = path.join(uploadDir, filename);

      try {
        // Check if the directory exists; if not, create it
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true }); // Recursively create the directory
        }

        // Write the file to the server temporarily
        fs.writeFileSync(tempFilePath, buffer);

        // Define options for Google Cloud Storage upload
        const options = {
          destination: filename, // or use a directory structure 'folder/filename'
          contentType: mimetype, // Ensure the file mimetype is passed
          resumable: false, // Set to false if you don't want to use resumable uploads
        };

        const fileResponse = await storage
          .bucket(bucketName)
          .upload(tempFilePath, options);

        // Clean up by deleting the temp file after uploading
        fs.unlinkSync(tempFilePath);

        if (fileResponse) {
          // save to file table
          await context.prisma.file.create({
            data: {
              clinic: {
                connect: {
                  id: clinicId,
                },
              },
              name: documentName, // consentForm, W9, demographics, etc. The form field name
              provider: {
                connect: {
                  id: providerId,
                },
              },
              url: `https://storage.googleapis.com/${bucketName}/${filename}`,
              user: {
                connect: {
                  id: context.user?.id,
                },
              },
            },
          });
        }

        return {
          filename: options.destination,
          name: documentName,
          url: `https://storage.googleapis.com/${bucketName}/${filename}`,
        };
      } catch (error: any) {
        // Catch and handle any errors during the process
        writeLogEntry(
          'Error uploading file to Google Cloud Storage: ',
          'WARNING',
        );
        // Optionally clean up the temporary file if it exists
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
        throw new Error(error.message || 'Unknown error occurred');
      }
    },
    deleteFileById: async (
      _parent: any,
      { id }: { id: string },
      context: any,
    ) => {
      const fileRecord = await context.prisma.file.findUnique({
        where: {
          id,
        },
      });

      if (fileRecord) {
        const { url: permanentUrl } = fileRecord;
        const fileName = permanentUrl.split(`${bucketName}/`)[1]; // Extract file name from permanentUrl

        try {
          await storage.bucket(bucketName).file(fileName).delete();

          const record = await context.prisma.file.delete({
            where: {
              id: fileRecord.id,
            },
          });

          return {
            id: record?.id,
          };
        } catch (error: any) {
          writeLogEntry(
            'Error deleting file from Google Cloud Storage: ',
            'WARNING',
          );
          throw new Error(error.message || 'Unknown error occurred');
        }
      }
    },
    deleteFile: async (
      _parent: any,
      {
        clinicId,
        documentName,
        providerId,
      }: { clinicId: string; documentName: string; providerId: string },
      context: any,
    ) => {
      const fileRecord = await context.prisma.file.findFirst({
        where: {
          AND: [
            { clinicId },
            { name: documentName },
            { providerId },
            { userId: context.user?.id },
          ],
        },
      });

      if (fileRecord) {
        const { url: permanentUrl } = fileRecord;
        const fileName = permanentUrl.split(`${bucketName}/`)[1]; // Extract file name from permanentUrl

        try {
          await storage.bucket(bucketName).file(fileName).delete();

          const record = await context.prisma.file.delete({
            where: {
              id: fileRecord.id,
            },
          });

          return {
            id: record?.id,
          };
        } catch (error: any) {
          writeLogEntry(
            'Error deleting file from Google Cloud Storage: ',
            'WARNING',
          );
          throw new Error(error.message || 'Unknown error occurred');
        }
      }
    },
    unarchiveFile: async (
      _parent: any,
      { id }: { id: string },
      context: any,
    ) => {
      const fileRecord = await context.prisma.file.findUnique({
        where: {
          id,
        },
      });

      if (fileRecord) {
        await context.prisma.file.update({
          data: {
            isArchived: false,
          },
          where: {
            id,
          },
        });

        return {
          id,
        };
      }
    },
  },
};
