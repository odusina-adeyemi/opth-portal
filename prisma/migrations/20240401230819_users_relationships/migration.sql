/*
  Warnings:

  - You are about to drop the column `userId` on the `clinics` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `providers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_userId_fkey";

-- DropForeignKey
ALTER TABLE "providers" DROP CONSTRAINT "providers_userId_fkey";

-- DropIndex
DROP INDEX "clinics_userId_key";

-- DropIndex
DROP INDEX "providers_userId_key";

-- AlterTable
ALTER TABLE "clinics" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "providers" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "clinicId" TEXT,
ADD COLUMN     "providerId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
