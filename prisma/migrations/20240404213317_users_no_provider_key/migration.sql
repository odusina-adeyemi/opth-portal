/*
  Warnings:

  - You are about to drop the column `providerId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_providerId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "providerId";
