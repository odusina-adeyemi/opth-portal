/*
  Warnings:

  - You are about to drop the column `amountToBePaidNonCommercialInsurance` on the `postOperations` table. All the data in the column will be lost.
  - You are about to drop the column `commercialAmountPaid` on the `postOperations` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceAmountToBePaid` on the `postOperations` table. All the data in the column will be lost.
  - You are about to drop the column `contactNotes` on the `preOperations` table. All the data in the column will be lost.
  - You are about to drop the column `dateAttemptedFirstContact` on the `preOperations` table. All the data in the column will be lost.
  - You are about to drop the column `dateComanagerAware` on the `preOperations` table. All the data in the column will be lost.
  - You are about to drop the column `dateInitialAppointmentScheduled` on the `preOperations` table. All the data in the column will be lost.
  - You are about to drop the column `dateReferralReceived` on the `preOperations` table. All the data in the column will be lost.
  - You are about to drop the `_ClinicToOperation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OperationToProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insurancePayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `operations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClinicToOperation" DROP CONSTRAINT "_ClinicToOperation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToOperation" DROP CONSTRAINT "_ClinicToOperation_B_fkey";

-- DropForeignKey
ALTER TABLE "_OperationToProvider" DROP CONSTRAINT "_OperationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_OperationToProvider" DROP CONSTRAINT "_OperationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_patientId_fkey";

-- DropForeignKey
ALTER TABLE "insurancePayments" DROP CONSTRAINT "insurancePayments_providerId_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_patientId_fkey";

-- AlterTable
ALTER TABLE "postOperations" DROP COLUMN "amountToBePaidNonCommercialInsurance",
DROP COLUMN "commercialAmountPaid",
DROP COLUMN "insuranceAmountToBePaid",
ADD COLUMN     "amountToBePaidFromInsurance" INTEGER,
ADD COLUMN     "amountToPayProvider" INTEGER,
ADD COLUMN     "transferOfCare" BOOLEAN,
ADD COLUMN     "transferOfCareDate" DATE;

-- AlterTable
ALTER TABLE "preOperations" DROP COLUMN "contactNotes",
DROP COLUMN "dateAttemptedFirstContact",
DROP COLUMN "dateComanagerAware",
DROP COLUMN "dateInitialAppointmentScheduled",
DROP COLUMN "dateReferralReceived",
ADD COLUMN     "consultationReportSent" BOOLEAN,
ADD COLUMN     "delayInSurgery" BOOLEAN,
ADD COLUMN     "delayLetterSent" BOOLEAN,
ADD COLUMN     "delayReason" TEXT,
ADD COLUMN     "eyesToBeDone" TEXT,
ADD COLUMN     "firstEyeSurgeryDate" DATE,
ADD COLUMN     "firstEyeSurgeryType" TEXT,
ADD COLUMN     "initialAppointmentCompleted" BOOLEAN,
ADD COLUMN     "isComanage" BOOLEAN,
ADD COLUMN     "reasonNoSurgeryScheduled" TEXT,
ADD COLUMN     "reasonNotComanage" TEXT,
ADD COLUMN     "secondEyeSurgeryDate" DATE,
ADD COLUMN     "secondEyeSurgeryType" TEXT,
ADD COLUMN     "surgeryScheduled" BOOLEAN;

-- DropTable
DROP TABLE "_ClinicToOperation";

-- DropTable
DROP TABLE "_OperationToProvider";

-- DropTable
DROP TABLE "insurancePayments";

-- DropTable
DROP TABLE "operations";

-- CreateTable
CREATE TABLE "patientContacts" (
    "id" TEXT NOT NULL,
    "contactNotes" TEXT,
    "dateAttemptedFirstContact" TIMESTAMP,
    "dateComanagerAware" TIMESTAMP,
    "dateInitialAppointmentScheduled" DATE,
    "dateReferralReceived" TIMESTAMP,
    "patientId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "patientContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicToPatientContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PatientContactToProvider" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patientContacts_patientId_key" ON "patientContacts"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPatientContact_AB_unique" ON "_ClinicToPatientContact"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPatientContact_B_index" ON "_ClinicToPatientContact"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientContactToProvider_AB_unique" ON "_PatientContactToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientContactToProvider_B_index" ON "_PatientContactToProvider"("B");

-- AddForeignKey
ALTER TABLE "patientContacts" ADD CONSTRAINT "patientContacts_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatientContact" ADD CONSTRAINT "_ClinicToPatientContact_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatientContact" ADD CONSTRAINT "_ClinicToPatientContact_B_fkey" FOREIGN KEY ("B") REFERENCES "patientContacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientContactToProvider" ADD CONSTRAINT "_PatientContactToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "patientContacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientContactToProvider" ADD CONSTRAINT "_PatientContactToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
