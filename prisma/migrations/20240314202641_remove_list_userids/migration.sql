/*
  Warnings:

  - You are about to drop the column `providerIDs` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `userIDs` on the `clinics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "providerIDs",
DROP COLUMN "userIDs";
