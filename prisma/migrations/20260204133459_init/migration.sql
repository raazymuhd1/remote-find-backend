/*
  Warnings:

  - Made the column `authorId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_authorId_fkey";

-- DropIndex
DROP INDEX "Job_authorId_key";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
