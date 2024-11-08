-- AlterTable
ALTER TABLE "providers" ADD COLUMN     "visitByLiaisonNeeded" BOOLEAN DEFAULT false,
ADD COLUMN     "visitByProviderNeeded" BOOLEAN DEFAULT false;
