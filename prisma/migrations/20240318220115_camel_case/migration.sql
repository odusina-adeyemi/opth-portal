/*
  Warnings:

  - You are about to drop the column `phone_number` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `consultation_report_sent` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `delay_in_surgery` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `delay_letter_sent` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `delay_reason` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `eyes_to_be_done` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `first_eye_surgery_date` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `first_eye_surgery_type` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `initial_appointment_completed` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `is_comanage` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `reason_no_surgery_scheduled` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `reason_not_comanage` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `second_eye_surgery_date` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `second_eye_surgery_type` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `surgery_scheduled` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `transfer_of_care` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `transfer_of_care_date` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_ClinicToPost_operation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClinicToPre_operation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Post_operationToProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Pre_operationToProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insurance_payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_operations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pre_operations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `clinics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `providers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ClinicToPost_operation" DROP CONSTRAINT "_ClinicToPost_operation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPost_operation" DROP CONSTRAINT "_ClinicToPost_operation_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPre_operation" DROP CONSTRAINT "_ClinicToPre_operation_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToPre_operation" DROP CONSTRAINT "_ClinicToPre_operation_B_fkey";

-- DropForeignKey
ALTER TABLE "_Post_operationToProvider" DROP CONSTRAINT "_Post_operationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_Post_operationToProvider" DROP CONSTRAINT "_Post_operationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "_Pre_operationToProvider" DROP CONSTRAINT "_Pre_operationToProvider_A_fkey";

-- DropForeignKey
ALTER TABLE "_Pre_operationToProvider" DROP CONSTRAINT "_Pre_operationToProvider_B_fkey";

-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_user_id_fkey";

-- DropForeignKey
ALTER TABLE "insurance_payments" DROP CONSTRAINT "insurance_payments_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "insurance_payments" DROP CONSTRAINT "insurance_payments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "insurance_payments" DROP CONSTRAINT "insurance_payments_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "post_operations" DROP CONSTRAINT "post_operations_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "pre_operations" DROP CONSTRAINT "pre_operations_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_user_id_fkey";

-- DropIndex
DROP INDEX "clinics_user_id_key";

-- DropIndex
DROP INDEX "operations_patient_id_key";

-- DropIndex
DROP INDEX "providers_user_id_key";

-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "phone_number",
DROP COLUMN "user_id",
DROP COLUMN "zip_code",
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "zipCode" TEXT;

-- AlterTable
ALTER TABLE "operations" DROP COLUMN "consultation_report_sent",
DROP COLUMN "delay_in_surgery",
DROP COLUMN "delay_letter_sent",
DROP COLUMN "delay_reason",
DROP COLUMN "eyes_to_be_done",
DROP COLUMN "first_eye_surgery_date",
DROP COLUMN "first_eye_surgery_type",
DROP COLUMN "initial_appointment_completed",
DROP COLUMN "is_comanage",
DROP COLUMN "patient_id",
DROP COLUMN "reason_no_surgery_scheduled",
DROP COLUMN "reason_not_comanage",
DROP COLUMN "second_eye_surgery_date",
DROP COLUMN "second_eye_surgery_type",
DROP COLUMN "surgery_scheduled",
DROP COLUMN "transfer_of_care",
DROP COLUMN "transfer_of_care_date",
ADD COLUMN     "consultationReportSent" BOOLEAN,
ADD COLUMN     "delayInSurgery" BOOLEAN,
ADD COLUMN     "delayLetterSent" BOOLEAN,
ADD COLUMN     "delayReason" TEXT,
ADD COLUMN     "eyesToBeDone" TEXT,
ADD COLUMN     "firstEyeSurgeryDate" DATE,
ADD COLUMN     "firstEyeSurgeryType" TEXT,
ADD COLUMN     "initialAppointmentCompleted" BOOLEAN,
ADD COLUMN     "isComanage" BOOLEAN,
ADD COLUMN     "patientId" INTEGER,
ADD COLUMN     "reasonNoSurgeryScheduled" TEXT,
ADD COLUMN     "reasonNotComanage" TEXT,
ADD COLUMN     "secondEyeSurgeryDate" DATE,
ADD COLUMN     "secondEyeSurgeryType" TEXT,
ADD COLUMN     "surgeryScheduled" BOOLEAN,
ADD COLUMN     "transferOfCare" BOOLEAN,
ADD COLUMN     "transferOfCareDate" DATE;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "phone_number",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "user_id",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- DropTable
DROP TABLE "_ClinicToPost_operation";

-- DropTable
DROP TABLE "_ClinicToPre_operation";

-- DropTable
DROP TABLE "_Post_operationToProvider";

-- DropTable
DROP TABLE "_Pre_operationToProvider";

-- DropTable
DROP TABLE "insurance_payments";

-- DropTable
DROP TABLE "post_operations";

-- DropTable
DROP TABLE "pre_operations";

-- CreateTable
CREATE TABLE "insurancePayments" (
    "id" SERIAL NOT NULL,
    "amountPayable" INTEGER,
    "amountPaidToProvider" INTEGER,
    "amountReceivableInsurance" INTEGER,
    "checkNumber" INTEGER,
    "checkDelivered" BOOLEAN,
    "checkDeliveryPaperwork" TEXT,
    "clinicId" INTEGER,
    "dateInsurancePaid" DATE,
    "datePaidProvider" DATE,
    "insuranceCompany" TEXT,
    "isCommercialInsurance" BOOLEAN,
    "patientId" INTEGER,
    "providerId" INTEGER,

    CONSTRAINT "insurancePayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preOperations" (
    "id" SERIAL NOT NULL,
    "contactNotes" TEXT,
    "dateAttemptedFirstContact" DATE,
    "dateComanagerAware" DATE,
    "dateInitialAppointmentScheduled" DATE,
    "dateReferralReceived" DATE,
    "patientId" INTEGER,

    CONSTRAINT "preOperations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postOperations" (
    "id" SERIAL NOT NULL,
    "amountToBePaidNonCommercialInsurance" INTEGER,
    "checkNumber" INTEGER,
    "checkDelivered" BOOLEAN,
    "checkDeliveryPaperwork" TEXT,
    "commercialAmountPaid" INTEGER,
    "contactedReferrer" BOOLEAN,
    "insuranceAmountToBePaid" INTEGER,
    "generalNotes" TEXT,
    "reasonNotReferredBack" TEXT,
    "referredBackToOriginalClinic" BOOLEAN,
    "referralCompleted" BOOLEAN,
    "referralCanceled" BOOLEAN,
    "referralCanceledReason" TEXT,
    "patientId" INTEGER,
    "postOpVisitDate" DATE,
    "postOpVisitType" TEXT,
    "typeOfInsurance" TEXT,

    CONSTRAINT "postOperations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicToPreOperation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClinicToPostOperation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PreOperationToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PostOperationToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "insurancePayments_clinicId_key" ON "insurancePayments"("clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "insurancePayments_patientId_key" ON "insurancePayments"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "insurancePayments_providerId_key" ON "insurancePayments"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "preOperations_patientId_key" ON "preOperations"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "postOperations_patientId_key" ON "postOperations"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPreOperation_AB_unique" ON "_ClinicToPreOperation"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPreOperation_B_index" ON "_ClinicToPreOperation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPostOperation_AB_unique" ON "_ClinicToPostOperation"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPostOperation_B_index" ON "_ClinicToPostOperation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PreOperationToProvider_AB_unique" ON "_PreOperationToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PreOperationToProvider_B_index" ON "_PreOperationToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostOperationToProvider_AB_unique" ON "_PostOperationToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PostOperationToProvider_B_index" ON "_PostOperationToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "clinics_userId_key" ON "clinics"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "operations_patientId_key" ON "operations"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "providers_userId_key" ON "providers"("userId");

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
ALTER TABLE "_ClinicToPreOperation" ADD CONSTRAINT "_ClinicToPreOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPreOperation" ADD CONSTRAINT "_ClinicToPreOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "preOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPostOperation" ADD CONSTRAINT "_ClinicToPostOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPostOperation" ADD CONSTRAINT "_ClinicToPostOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "postOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreOperationToProvider" ADD CONSTRAINT "_PreOperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "preOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreOperationToProvider" ADD CONSTRAINT "_PreOperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOperationToProvider" ADD CONSTRAINT "_PostOperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "postOperations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostOperationToProvider" ADD CONSTRAINT "_PostOperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
