-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "referringProviderId" TEXT,
ADD COLUMN     "surgeonId" TEXT;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_referringProviderId_fkey" FOREIGN KEY ("referringProviderId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_surgeonId_fkey" FOREIGN KEY ("surgeonId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
