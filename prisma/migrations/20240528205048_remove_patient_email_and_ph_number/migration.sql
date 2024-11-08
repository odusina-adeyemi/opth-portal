/*
  Warnings:

  - You are about to drop the column `email` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `paperworkComplete` on the `patients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "patients_email_key";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "email",
DROP COLUMN "paperworkComplete";
