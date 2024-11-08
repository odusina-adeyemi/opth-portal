-- AlterTable
ALTER TABLE "postOperations" ADD COLUMN     "receivedOptomPostOpNotes" BOOLEAN;

-- CreateTable
CREATE TABLE "insurance_companies" (
    "id" TEXT NOT NULL,
    "isCommercial" BOOLEAN DEFAULT false,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "insurance_companies_pkey" PRIMARY KEY ("id")
);
