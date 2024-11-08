/*
  Warnings:

  - You are about to drop the column `visitByLiaisonNeeded` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `visitByProviderNeeded` on the `providers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "providers" DROP COLUMN "visitByLiaisonNeeded",
DROP COLUMN "visitByProviderNeeded";
