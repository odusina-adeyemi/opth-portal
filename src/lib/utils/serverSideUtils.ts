import { Storage } from '@google-cloud/storage';
// temporary link for a user to view their object in storage
export const generateSignedUrl = async (
  storage: Storage,
  bucketName: string,
  filename: string,
) => {
  const options = {
    version: 'v4' as 'v4',
    action: 'read' as 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  const url = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);

  return url;
};
