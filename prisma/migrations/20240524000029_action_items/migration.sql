-- AlterTable
ALTER TABLE "clinics" ADD COLUMN     "referrerStatusTimeline" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "action_items" (
    "id" TEXT NOT NULL,
    "action" TEXT,
    "completed" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATE,
    "notes" TEXT,
    "providerId" TEXT,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "action_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "action_items_providerId_key" ON "action_items"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "action_items_userId_key" ON "action_items"("userId");

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action_items" ADD CONSTRAINT "action_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
