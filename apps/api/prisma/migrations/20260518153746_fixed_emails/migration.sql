/*
  Warnings:

  - You are about to drop the column `email` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `emails` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Lead" DROP COLUMN "email",
ADD COLUMN     "emails" TEXT NOT NULL;
