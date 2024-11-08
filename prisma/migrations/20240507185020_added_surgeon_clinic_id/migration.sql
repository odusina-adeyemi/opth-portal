-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "surgeonClinicId" TEXT;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_surgeonClinicId_fkey" FOREIGN KEY ("surgeonClinicId") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
