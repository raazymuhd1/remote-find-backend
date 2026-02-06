/*
  Warnings:

  - You are about to alter the column `recentJob` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `workAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experience" VARCHAR(100) DEFAULT '0 Year',
ADD COLUMN     "resident" VARCHAR(100) DEFAULT 'Jakarta, Indonesia',
ALTER COLUMN "recentJob" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "workAt" SET DATA TYPE VARCHAR(100);
