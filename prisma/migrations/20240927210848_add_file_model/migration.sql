-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "clinicId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "providerId" TEXT,
    "url" TEXT,
    "userId" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_providerId_key" ON "files"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "files_userId_key" ON "files"("userId");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
