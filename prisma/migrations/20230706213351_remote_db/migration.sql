-- CreateEnum
CREATE TYPE "NotePriority" AS ENUM ('conflict', 'warning', 'notification');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('option', 'info');

-- CreateEnum
CREATE TYPE "NotificationAction" AS ENUM ('board_invite');

-- CreateTable
CREATE TABLE "NotificationActionData" (
    "_id" TEXT NOT NULL,
    "boardId" TEXT,

    CONSTRAINT "NotificationActionData_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "_id" TEXT NOT NULL,
    "text" VARCHAR(300) NOT NULL,
    "priority" "NotePriority" NOT NULL DEFAULT 'notification',
    "action" "NotificationAction" NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'info',
    "userId" TEXT,
    "notificationActionDataId" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_notificationActionDataId_fkey" FOREIGN KEY ("notificationActionDataId") REFERENCES "NotificationActionData"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
