/*
  Warnings:

  - You are about to drop the column `usersId` on the `BoardMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoardMember" DROP CONSTRAINT "BoardMember_usersId_fkey";

-- AlterTable
ALTER TABLE "BoardMember" DROP COLUMN "usersId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
