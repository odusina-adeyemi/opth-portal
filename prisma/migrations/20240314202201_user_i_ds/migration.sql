/*
  Warnings:

  - You are about to drop the column `providerIds` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `userIds` on the `clinics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "providerIds",
DROP COLUMN "userIds",
ADD COLUMN     "providerIDs" INTEGER[],
ADD COLUMN     "userIDs" INTEGER[];
