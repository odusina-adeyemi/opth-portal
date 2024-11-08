/*
  Warnings:

  - The `patientId` column on the `insurancePayments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `patientId` column on the `operations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `patients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `patientId` column on the `postOperations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `patientId` column on the `preOperations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_ClinicToPatient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_PatientToProvider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
ALTER TABLE "_ClinicToPatient" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_PatientToProvider" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "insurancePayments" DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER;

-- AlterTable
ALTER TABLE "operations" DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER;

-- AlterTable
ALTER TABLE "patients" DROP CONSTRAINT "patients_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "patients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "postOperations" DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER;

-- AlterTable
ALTER TABLE "preOperations" DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToPatient_AB_unique" ON "_ClinicToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToPatient_B_index" ON "_ClinicToPatient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToProvider_AB_unique" ON "_PatientToProvider"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "insurancePayments_patientId_key" ON "insurancePayments"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "operations_patientId_key" ON "operations"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "postOperations_patientId_key" ON "postOperations"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "preOperations_patientId_key" ON "preOperations"("patientId");

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
