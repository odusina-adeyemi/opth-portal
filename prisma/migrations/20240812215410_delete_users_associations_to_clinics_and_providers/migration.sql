/*
  Warnings:

  - You are about to drop the `_ClinicToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProviderToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClinicToUser" DROP CONSTRAINT "_ClinicToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClinicToUser" DROP CONSTRAINT "_ClinicToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProviderToUser" DROP CONSTRAINT "_ProviderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProviderToUser" DROP CONSTRAINT "_ProviderToUser_B_fkey";

-- DropTable
DROP TABLE "_ClinicToUser";

-- DropTable
DROP TABLE "_ProviderToUser";
