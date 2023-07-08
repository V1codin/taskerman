-- DropForeignKey
ALTER TABLE "passwords" DROP CONSTRAINT "passwords_userId_fkey";

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
