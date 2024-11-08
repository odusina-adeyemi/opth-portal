/*
  Warnings:

  - You are about to drop the column `providers` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "providers" DROP COLUMN "providers",
ADD COLUMN     "associatedProviderIds" TEXT[];
