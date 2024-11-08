/*
  Warnings:

  - You are about to drop the column `specialty` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "providers" DROP COLUMN "specialty",
ADD COLUMN     "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[];
