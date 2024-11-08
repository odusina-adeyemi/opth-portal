import { Logging } from '@google-cloud/logging';

// Possible severity level values: "NOTICE" | "INFO" | "ERROR" | "WARNING" | "ALERT" | "EMERGENCY" | "CRITICAL" | "DEBUG"

// Creates a logging client
const logging = new Logging({
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// Select the log to write to
const log = logging.log('viewpoint-co-management-log');

// Prepare the log entry function
export const writeLogEntry = async (message: string, severity = 'ERROR') => {
  const metadata = {
    resource: { type: 'global' }, // Adjust resource type based on your setup (optional)
    severity: severity, // Can be INFO, ERROR, WARNING, etc.
  };

  const entry = log.entry(metadata, {
    message: message,
    timestamp: new Date().toISOString(),
  });

  // Write the log entry
  try {
    await log.write(entry);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error writing to Google Cloud Logging:', error);
  }
};
