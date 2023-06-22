/*
  Warnings:

  - Added the required column `userId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NULL;

UPDATE "Resource" r SET "userId" = (
  SELECT cl."ownerId" FROM "Classroom" cl
    JOIN "Category" cat ON cl.id = cat."classroomId"
    WHERE cat.id = r."categoryId"
    LIMIT 1
  );

ALTER TABLE "Resource" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
