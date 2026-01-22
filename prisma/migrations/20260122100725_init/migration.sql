-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'John Cena',
    "email" TEXT NOT NULL DEFAULT 'johncena@gmail.com',
    "picture" TEXT NOT NULL DEFAULT 'my image',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDetail" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'Jakarta',
    "position" TEXT NOT NULL DEFAULT 'Remote',
    "type" TEXT NOT NULL DEFAULT 'Fulltime',
    "salaryRange" TEXT NOT NULL DEFAULT '$1K',
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "JobDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL DEFAULT 'Apple',
    "companyPicture" TEXT NOT NULL DEFAULT 'company picture',
    "role" TEXT NOT NULL DEFAULT 'Frontend Developer',
    "requirements" TEXT[],
    "responsibilities" TEXT[],
    "description" TEXT NOT NULL DEFAULT 'Our company is the best',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JobDetail_jobId_key" ON "JobDetail"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_authorId_key" ON "Job"("authorId");

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
