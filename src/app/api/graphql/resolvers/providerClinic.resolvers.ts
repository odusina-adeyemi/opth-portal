import { ProviderClinic } from '../../../../constants/types/types';
import { handleAssertDataValidationError } from '../../../../lib/utils/utils';
import {
  CreateProviderClinicStruct,
  UpdateProviderClinicStruct,
} from '../../../api/graphql/mutations/providerClinicMutations';
import { assert } from 'superstruct';
import { ProviderClinicCreateUpdateInput } from '../../../api/graphql/mutations/providerClinicMutations';

export const providerClinicResolver = {
  Query: {
    providerClinicDocuments: async (
      _parent: ProviderClinic,
      args: any,
      context: any,
    ) => {
      return await context.prisma.providerClinic.findUnique({
        where: {
          providerId_clinicId: {
            clinicId: args.clinicId,
            providerId: args.providerId,
          },
        },
      });
    },
    allProviderClinicDocuments: async (
      _parent: ProviderClinic,
      args: any,
      context: any,
    ) => {
      return await context.prisma.providerClinic.findMany({
        where: {
          providerId: args.providerId,
        },
      });
    },
  },

  Mutation: {
    createProviderClinic: async (
      _parent: ProviderClinic,
      {
        providerClinicInput,
      }: { providerClinicInput: ProviderClinicCreateUpdateInput },
      context: any,
    ) => {
      try {
        providerClinicInput.forEach(data => {
          assert(data, CreateProviderClinicStruct);
        });
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }

      try {
        await context.prisma.$transaction(async (prisma: any) => {
          await prisma.providerClinic.createMany({
            data: providerClinicInput,
          });
        });
        const createdRecords = await context.prisma.providerClinic.findMany({
          where: {
            providerId: providerClinicInput[0].providerId,
            clinicId: {
              in: providerClinicInput.map(data => data.clinicId),
            },
          },
        });

        // Return the created records in the GraphQL response
        return createdRecords;
      } catch (error) {
        throw new Error('Error creating provider clinic documents data');
      }
    },
    updateProviderClinic: async (
      _parent: ProviderClinic,
      {
        providerClinicInput,
      }: {
        providerClinicInput: ProviderClinicCreateUpdateInput;
      },
      context: any,
    ) => {
      try {
        providerClinicInput.forEach(data => {
          assert(data, UpdateProviderClinicStruct);
        });
      } catch (error: any) {
        handleAssertDataValidationError(error);
      }
      try {
        const providerId = providerClinicInput[0]?.providerId;

        if (providerId) {
          // Step 1: Fetch all current providerClinic records for the provider
          const existingRecords = await context.prisma.providerClinic.findMany({
            where: { providerId },
          });

          // Step 2: Get the clinicIds from the incoming data
          const incomingClinicIds = providerClinicInput.map(
            data => data.clinicId,
          );

          // Step 3: Identify clinicIds that are in the existing records but not in the new data
          const clinicIdsToDelete = existingRecords
            .filter(
              (record: ProviderClinic) =>
                !incomingClinicIds.includes(record.clinicId),
            )
            .map((record: ProviderClinic) => record.clinicId);

          // Step 4: Delete records for clinicIds that are no longer present
          if (clinicIdsToDelete.length > 0) {
            await context.prisma.providerClinic.deleteMany({
              where: {
                providerId,
                clinicId: { in: clinicIdsToDelete },
              },
            });
          }
        }

        await context.prisma.$transaction(async (prisma: any) => {
          for (const data of providerClinicInput) {
            await prisma.providerClinic.upsert({
              where: {
                providerId_clinicId: {
                  providerId,
                  clinicId: data.clinicId,
                },
              },
              update: {
                consentFormOnFile: data.consentFormOnFile ?? false,
                hasDemographics: data.hasDemographics ?? false,
                hasW9: data.hasW9 ?? false,
              },
              create: {
                clinicId: data.clinicId,
                providerId: data.providerId,
                consentFormOnFile: data.consentFormOnFile ?? false,
                hasDemographics: data.hasDemographics ?? false,
                hasW9: data.hasW9 ?? false,
              },
            });
          }
        });
      } catch (error) {
        throw new Error('Error updating provider clinic documents data');
      }
    },
    deleteProviderClinic: async (
      _parent: ProviderClinic,
      {
        providerId,
      }: {
        providerId: string;
      },
      context: any,
    ) => {
      return await context.prisma.providerClinic.delete({
        where: { providerId },
      });
    },
  },
};
