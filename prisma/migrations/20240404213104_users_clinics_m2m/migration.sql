/*
  Warnings:

  - You are about to drop the column `clinicId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clinicId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clinicId";

-- CreateTable
CREATE TABLE "_ClinicToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToUser_AB_unique" ON "_ClinicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToUser_B_index" ON "_ClinicToUser"("B");

-- AddForeignKey
ALTER TABLE "_ClinicToUser" ADD CONSTRAINT "_ClinicToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToUser" ADD CONSTRAINT "_ClinicToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
