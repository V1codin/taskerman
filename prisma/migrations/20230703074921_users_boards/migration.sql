/*
  Warnings:

  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_Id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_Id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropIndex
DROP INDEX "sessions_userId_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "userId",
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_Id_key" ON "sessions"("user_Id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
