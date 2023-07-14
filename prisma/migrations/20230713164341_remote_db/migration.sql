-- CreateEnum
CREATE TYPE "Role" AS ENUM ('guest', 'owner', 'admin', 'member');

-- CreateEnum
CREATE TYPE "NotePriority" AS ENUM ('conflict', 'warning', 'notification');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('option', 'info');

-- CreateEnum
CREATE TYPE "NotificationAction" AS ENUM ('board_invite');

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "display_name" VARCHAR(36),
    "image_url" VARCHAR(200),
    "username" VARCHAR(16) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "name_alias" VARCHAR(200),
    "pendingInvites" TEXT[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boards" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(74) NOT NULL,
    "bg" VARCHAR(200) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "BoardMember" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'guest',
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "boardId" TEXT,
    "userId" TEXT,

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "passwords" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "_id" TEXT NOT NULL,
    "pw" VARCHAR(150) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "_id" TEXT NOT NULL,
    "user_Id" TEXT NOT NULL,
    "expires" DATE NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("_id")
);

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
    "notificationActionDataId" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_email_key" ON "users"("username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_userId_key" ON "passwords"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_Id_key" ON "sessions"("user_Id");

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMember" ADD CONSTRAINT "BoardMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_notificationActionDataId_fkey" FOREIGN KEY ("notificationActionDataId") REFERENCES "NotificationActionData"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
