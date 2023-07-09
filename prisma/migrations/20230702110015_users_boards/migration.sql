/*
  Warnings:

  - You are about to drop the `boardMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "boardMember" DROP CONSTRAINT "boardMember_boardId_fkey";

-- DropForeignKey
ALTER TABLE "boardMember" DROP CONSTRAINT "boardMember_usersId_fkey";

-- DropTable
DROP TABLE "boardMember";

-- CreateTable
CREATE TABLE "BoardMember" (
    "_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "boardId" TEXT,
    "usersId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
