-- CreateTable
CREATE TABLE "users" (
    "display_name" VARCHAR(36),
    "image_url" VARCHAR(200),
    "username" VARCHAR(16) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "name_alias" VARCHAR(200),
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boards" (
    "title" VARCHAR(74) NOT NULL,
    "bg" VARCHAR(200) NOT NULL,
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "memberIds" BIGINT,

    CONSTRAINT "boards_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "boardMember" (
    "_id" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "boardId" TEXT,
    "usersId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "boardMember_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "boards_ownerId_key" ON "boards"("ownerId");

-- AddForeignKey
ALTER TABLE "boards" ADD CONSTRAINT "boards_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardMember" ADD CONSTRAINT "boardMember_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "boards"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardMember" ADD CONSTRAINT "boardMember_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
