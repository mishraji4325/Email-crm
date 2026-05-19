/*
  Warnings:

  - Added the required column `email` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Email" ADD COLUMN     "campaignId" TEXT;

-- AlterTable
ALTER TABLE "public"."Lead" ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Email" ADD CONSTRAINT "Email_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
