-- CreateTable
CREATE TABLE "provider_statuses" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "organizationId" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "provider_statuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "provider_statuses" ADD CONSTRAINT "provider_statuses_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
