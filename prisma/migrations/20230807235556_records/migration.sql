-- CreateEnum
CREATE TYPE "RecordTypes" AS ENUM ('text');

-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('IN_PROGRESS', 'DONE', 'TO_DO', 'STUCK');

-- CreateTable
CREATE TABLE "records" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "_id" TEXT NOT NULL,
    "type" "RecordTypes" NOT NULL DEFAULT 'text',
    "heading" VARCHAR(32) NOT NULL,
    "text" TEXT[],
    "status" "RecordStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "userId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "records_userId_key" ON "records"("userId");

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
