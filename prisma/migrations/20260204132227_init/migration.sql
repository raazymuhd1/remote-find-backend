-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_authorId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
