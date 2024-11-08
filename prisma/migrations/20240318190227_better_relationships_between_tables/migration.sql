/*
  Warnings:

  - You are about to drop the column `insurance_payment_id` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `clinic_id` on the `operations` table. All the data in the column will be lost.
  - You are about to drop the column `clinic_id` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `clinic_id` on the `post_operations` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `post_operations` table. All the data in the column will be lost.
  - You are about to drop the column `clinic_id` on the `pre_operations` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `pre_operations` table. All the data in the column will be lost.
  - You are about to drop the column `insurance_payment_id` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `clinic_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `clinics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clinic_id]` on the table `insurance_payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patient_id]` on the table `insurance_payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider_id]` on the table `insurance_payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patient_id]` on the table `operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patient_id]` on the table `post_operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patient_id]` on the table `pre_operations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `providers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_insurance_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "operations" DROP CONSTRAINT "operations_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "post_operations" DROP CONSTRAINT "post_operations_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "post_operations" DROP CONSTRAINT "post_operations_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "pre_operations" DROP CONSTRAINT "pre_operations_clinic_id_fkey";

-- DropForeignKey
ALTER TABLE "pre_operations" DROP CONSTRAINT "pre_operations_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_insurance_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clinic_id_fkey";

-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "insurance_payment_id",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "insurance_payments" ADD COLUMN     "clinic_id" INTEGER,
ADD COLUMN     "provider_id" INTEGER;

-- AlterTable
ALTER TABLE "operations" DROP COLUMN "clinic_id";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "clinic_id";

-- AlterTable
ALTER TABLE "post_operations" DROP COLUMN "clinic_id",
DROP COLUMN "provider_id";

-- AlterTable
ALTER TABLE "pre_operations" DROP COLUMN "clinic_id",
DROP COLUMN "provider_id";

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "insurance_payment_id",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clinic_id";

-- CreateTable
CREATE TABLE "_ClinicToOperation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClinicToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClinicToPre_operation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ClinicToPost_operation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Pre_operationToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_operationToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToOperation_AB_unique" ON "_ClinicToOperation"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToOperation_B_index" ON "_ClinicToOperation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPatient_AB_unique" ON "_ClinicToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPatient_B_index" ON "_ClinicToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPre_operation_AB_unique" ON "_ClinicToPre_operation"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPre_operation_B_index" ON "_ClinicToPre_operation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPost_operation_AB_unique" ON "_ClinicToPost_operation"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPost_operation_B_index" ON "_ClinicToPost_operation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Pre_operationToProvider_AB_unique" ON "_Pre_operationToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_Pre_operationToProvider_B_index" ON "_Pre_operationToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_operationToProvider_AB_unique" ON "_Post_operationToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_operationToProvider_B_index" ON "_Post_operationToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "clinics_user_id_key" ON "clinics"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_payments_clinic_id_key" ON "insurance_payments"("clinic_id");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_payments_patient_id_key" ON "insurance_payments"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_payments_provider_id_key" ON "insurance_payments"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "operations_patient_id_key" ON "operations"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_operations_patient_id_key" ON "post_operations"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "pre_operations_patient_id_key" ON "pre_operations"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "providers_user_id_key" ON "providers"("user_id");

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_payments" ADD CONSTRAINT "insurance_payments_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_payments" ADD CONSTRAINT "insurance_payments_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToOperation" ADD CONSTRAINT "_ClinicToOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToOperation" ADD CONSTRAINT "_ClinicToOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatient" ADD CONSTRAINT "_ClinicToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPatient" ADD CONSTRAINT "_ClinicToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPre_operation" ADD CONSTRAINT "_ClinicToPre_operation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPre_operation" ADD CONSTRAINT "_ClinicToPre_operation_B_fkey" FOREIGN KEY ("B") REFERENCES "pre_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPost_operation" ADD CONSTRAINT "_ClinicToPost_operation_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToPost_operation" ADD CONSTRAINT "_ClinicToPost_operation_B_fkey" FOREIGN KEY ("B") REFERENCES "post_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pre_operationToProvider" ADD CONSTRAINT "_Pre_operationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "pre_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pre_operationToProvider" ADD CONSTRAINT "_Pre_operationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_operationToProvider" ADD CONSTRAINT "_Post_operationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "post_operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_operationToProvider" ADD CONSTRAINT "_Post_operationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
