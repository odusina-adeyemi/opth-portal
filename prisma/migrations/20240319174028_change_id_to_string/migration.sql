/*
  Warnings:

  - The primary key for the `clinics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `insurancePayments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `operations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `postOperations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `preOperations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `providers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ClinicToOperation" DROP CONSTRAINT "_ClinicToOperation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToOperation" DROP CONSTRAINT "_ClinicToOperation_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPatient" DROP CONSTRAINT "_ClinicToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPatient" DROP CONSTRAINT "_ClinicToPatient_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPostOperation" DROP CONSTRAINT "_ClinicToPostOperation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPostOperation" DROP CONSTRAINT "_ClinicToPostOperation_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPreOperation" DROP CONSTRAINT "_ClinicToPreOperation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPreOperation" DROP CONSTRAINT "_ClinicToPreOperation_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToProvider" DROP CONSTRAINT "_ClinicToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToProvider" DROP CONSTRAINT "_ClinicToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "_OperationToProvider" DROP CONSTRAINT "_OperationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_OperationToProvider" DROP CONSTRAINT "_OperationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToProvider" DROP CONSTRAINT "_PatientToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToProvider" DROP CONSTRAINT "_PatientToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostOperationToProvider" DROP CONSTRAINT "_PostOperationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostOperationToProvider" DROP CONSTRAINT "_PostOperationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "_PreOperationToProvider" DROP CONSTRAINT "_PreOperationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_PreOperationToProvider" DROP CONSTRAINT "_PreOperationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_userId_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_providerId_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "postOperations" DROP CONSTRAINT "postOperations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "preOperations" DROP CONSTRAINT "preOperations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_userId_fkey";

-- AlterTable
ALTER TABLE "_ClinicToOperation" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClinicToPatient" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClinicToPostOperation" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClinicToPreOperation" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ClinicToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_OperationToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PatientToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PostOperationToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PreOperationToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "clinics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "clinics_id_seq";

-- AlterTable
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clinicId" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ALTER COLUMN "providerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "insurancePayments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "insurancePayments_id_seq";

-- AlterTable
ALTER TABLE "operations" DROP CONSTRAINT "operations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "operations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "operations_id_seq";

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "patients_id_seq";

-- AlterTable
ALTER TABLE "postOperations" DROP CONSTRAINT "postOperations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "postOperations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "postOperations_id_seq";

-- AlterTable
ALTER TABLE "preOperations" DROP CONSTRAINT "preOperations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "preOperations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "preOperations_id_seq";

-- AlterTable
ALTER TABLE "providers" DROP CONSTRAINT "providers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "providers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "providers_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurancePayments" ADD CONSTRAINT "insurancePayments_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurancePayments" ADD CONSTRAINT "insurancePayments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurancePayments" ADD CONSTRAINT "insurancePayments_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preOperations" ADD CONSTRAINT "preOperations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postOperations" ADD CONSTRAINT "postOperations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToOperation" ADD CONSTRAINT "_ClinicToOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToOperation" ADD CONSTRAINT "_ClinicToOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatient" ADD CONSTRAINT "_ClinicToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatient" ADD CONSTRAINT "_ClinicToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPreOperation" ADD CONSTRAINT "_ClinicToPreOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPreOperation" ADD CONSTRAINT "_ClinicToPreOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "preOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPostOperation" ADD CONSTRAINT "_ClinicToPostOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPostOperation" ADD CONSTRAINT "_ClinicToPostOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "postOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToProvider" ADD CONSTRAINT "_ClinicToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToProvider" ADD CONSTRAINT "_ClinicToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperationToProvider" ADD CONSTRAINT "_OperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperationToProvider" ADD CONSTRAINT "_OperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToProvider" ADD CONSTRAINT "_PatientToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToProvider" ADD CONSTRAINT "_PatientToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreOperationToProvider" ADD CONSTRAINT "_PreOperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "preOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreOperationToProvider" ADD CONSTRAINT "_PreOperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOperationToProvider" ADD CONSTRAINT "_PostOperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "postOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOperationToProvider" ADD CONSTRAINT "_PostOperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
