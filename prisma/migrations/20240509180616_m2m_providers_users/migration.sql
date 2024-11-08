/*
  Warnings:

  - A unique constraint covering the columns `[referringClinicId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referringProviderId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[surgeonId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[surgeonClinicId]` on the table `patients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_ProviderToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToUser_AB_unique" ON "_ProviderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToUser_B_index" ON "_ProviderToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "patients_referringClinicId_key" ON "patients"("referringClinicId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_referringProviderId_key" ON "patients"("referringProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_surgeonId_key" ON "patients"("surgeonId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_surgeonClinicId_key" ON "patients"("surgeonClinicId");

-- AddForeignKey
ALTER TABLE "_ProviderToUser" ADD CONSTRAINT "_ProviderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToUser" ADD CONSTRAINT "_ProviderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
