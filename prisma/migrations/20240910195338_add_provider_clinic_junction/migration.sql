-- CreateTable
CREATE TABLE "provider_clinics" (
    "consentFormOnFile" BOOLEAN NOT NULL,
    "hasDemographics" BOOLEAN NOT NULL,
    "providerId" TEXT NOT NULL,
    "clinicId" TEXT NOT NULL,
    "hasW9" BOOLEAN NOT NULL,
    "consentFormSigned" BOOLEAN NOT NULL,

    CONSTRAINT "provider_clinics_pkey" PRIMARY KEY ("providerId","clinicId")
);

-- AddForeignKey
ALTER TABLE "provider_clinics" ADD CONSTRAINT "provider_clinics_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_clinics" ADD CONSTRAINT "provider_clinics_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
