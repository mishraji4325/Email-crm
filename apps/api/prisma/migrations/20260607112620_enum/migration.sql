/*
  Warnings:

  - The `status` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'REPLIED', 'BOOKED', 'CLOSED');

-- AlterTable
ALTER TABLE "public"."Lead" DROP COLUMN "status",
ADD COLUMN     "status" "public"."LeadStatus" NOT NULL DEFAULT 'NEW';
