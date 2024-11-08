-- AlterTable
ALTER TABLE "insurance_companies" ADD COLUMN     "organizationId" TEXT;

-- AddForeignKey
ALTER TABLE "insurance_companies" ADD CONSTRAINT "insurance_companies_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
