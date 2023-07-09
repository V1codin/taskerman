/*
  Warnings:

  - The `role` column on the `BoardMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `memberIds` on the `boards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('guest', 'owner', 'admin', 'member');

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "BoardMember" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'guest';

-- AlterTable
ALTER TABLE "boards" DROP COLUMN "memberIds";

-- CreateTable
CREATE TABLE "passwords" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "_id" TEXT NOT NULL,
    "pw" VARCHAR(150) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "passwords_userId_key" ON "passwords"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_email_key" ON "users"("username", "email");

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
