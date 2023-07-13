/*
  Warnings:

  - A unique constraint covering the columns `[boardId]` on the table `BoardMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `BoardMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId]` on the table `NotificationActionData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoardMember_boardId_key" ON "BoardMember"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "BoardMember_userId_key" ON "BoardMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationActionData_boardId_key" ON "NotificationActionData"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "notifications_userId_key" ON "notifications"("userId");
