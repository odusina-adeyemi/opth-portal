// import { PrismaClient } from '@prisma/client';

// // PrismaClient is attached to the global object in development to
// // prevent exhausting the database connection limit

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!(global as any).prisma) {
//     (global as any).prisma = new PrismaClient();
//   }
//   prisma = (global as any).prisma;
// }
// export default prisma;



import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn'], // Log errors and warnings
  });
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ['query', 'error', 'warn', 'info'], // Log all events in development
    });
  }
  prisma = (global as any).prisma;
}

export default prisma;
