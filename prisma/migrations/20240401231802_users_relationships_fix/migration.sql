/*
  Warnings:

  - A unique constraint covering the columns `[clinicId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_clinicId_key" ON "users"("clinicId");

-- CreateIndex
CREATE UNIQUE INDEX "users_providerId_key" ON "users"("providerId");
