/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `providers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "dateVisitedByLiaison" DATE,
ADD COLUMN     "dateVisitedByProvider" DATE,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "providers_email_key" ON "providers"("email");
