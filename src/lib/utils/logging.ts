// import { Logging } from '@google-cloud/logging';

// Possible severity level values: "NOTICE" | "INFO" | "ERROR" | "WARNING" | "ALERT" | "EMERGENCY" | "CRITICAL" | "DEBUG"

let Logging: any;

if (typeof window === 'undefined') {
  // Only require the logging library server-side
  Logging = require('@google-cloud/logging');
}

export const writeLogEntry = async (message: string, p0: string) => {
  if (!Logging) {
    console.warn('Attempted to log from the client-side; skipping log.');
    return;
  }
  
  const logging = new Logging();
  const log = logging.log('viewpoint-co-management-log');

  const metadata = {
    resource: { type: 'global' },
  };

  const entry = log.entry(metadata, {
    message,
    timestamp: new Date().toISOString(),
  });
  await log.write(entry);
};

// Select the log to write to
// const log = logging.log('viewpoint-co-management-log');

// Prepare the log entry function
// export const writeLogEntry = async (message: string, severity = 'ERROR') => {
//   const metadata = {
//     resource: { type: 'global' }, // Adjust resource type based on your setup (optional)
//     severity: severity, // Can be INFO, ERROR, WARNING, etc.
//   };

//   const entry = log.entry(metadata, {
//     message: message,
//     timestamp: new Date().toISOString(),
//   });

//   // Write the log entry
//   try {
//     await log.write(entry);
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Error writing to Google Cloud Logging:', error);
//   }
// };
