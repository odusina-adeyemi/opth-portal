-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "referringClinicId" TEXT;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_referringClinicId_fkey" FOREIGN KEY ("referringClinicId") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
