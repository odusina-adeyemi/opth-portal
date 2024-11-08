/*
  Warnings:

  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ClinicToPatient" DROP CONSTRAINT "_ClinicToPatient_B_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToProvider" DROP CONSTRAINT "_PatientToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "postOperations" DROP CONSTRAINT "postOperations_patientId_fkey";

-- DropForeignKey
ALTER TABLE "preOperations" DROP CONSTRAINT "preOperations_patientId_fkey";

-- AlterTable
ALTER TABLE "_ClinicToPatient" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PatientToProvider" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "insurancePayments" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "operations" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "patients_id_seq";

-- AlterTable
ALTER TABLE "postOperations" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "preOperations" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "insurancePayments" ADD CONSTRAINT "insurancePayments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preOperations" ADD CONSTRAINT "preOperations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postOperations" ADD CONSTRAINT "postOperations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatient" ADD CONSTRAINT "_ClinicToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToProvider" ADD CONSTRAINT "_PatientToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
