/*
  Warnings:

  - You are about to drop the column `generalNotes` on the `postOperations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "generalNotes" TEXT;

-- AlterTable
ALTER TABLE "postOperations" DROP COLUMN "generalNotes",
ADD COLUMN     "paidOptomDate" DATE;
