/*
  Warnings:

  - You are about to drop the column `paperworkUpToDate` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "consentFormSigned" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "paperworkUpToDate",
ADD COLUMN     "consentFormOnFile" BOOLEAN DEFAULT false,
ADD COLUMN     "hasDemographics" BOOLEAN DEFAULT false,
ADD COLUMN     "hasW9" BOOLEAN DEFAULT false;
