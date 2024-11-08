-- DropForeignKey
ALTER TABLE "provider_clinics" DROP CONSTRAINT "provider_clinics_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "provider_clinics" DROP CONSTRAINT "provider_clinics_providerId_fkey";

-- AddForeignKey
ALTER TABLE "provider_clinics" ADD CONSTRAINT "provider_clinics_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_clinics" ADD CONSTRAINT "provider_clinics_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
