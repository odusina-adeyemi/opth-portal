import { PrismaClient } from '@prisma/client';
import {
  clinics,
  patientContactData,
  patients,
  postOperationData,
  preOperationData,
  providers,
  users,
} from '../src/lib/placeholder-data';

const prisma = new PrismaClient();

async function main() {
  // clear all tables
  await prisma.patientContact.deleteMany({});
  await prisma.postOperation.deleteMany({});
  await prisma.preOperation.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.clinic.deleteMany({});
  await prisma.user.deleteMany({});

  // seed data
  await prisma.clinic.createMany({ data: clinics });
  await prisma.patientContact.createMany({ data: patientContactData });
  await prisma.patient.createMany({ data: patients });
  await prisma.postOperation.createMany({ data: postOperationData });
  await prisma.preOperation.createMany({ data: preOperationData });
  await prisma.provider.createMany({ data: providers });
  await prisma.user.createMany({ data: users });
}

main()
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
