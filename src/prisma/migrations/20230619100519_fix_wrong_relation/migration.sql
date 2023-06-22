/*
  Warnings:

  - You are about to drop the column `userId` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId,assignmentId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropIndex
DROP INDEX "Submission_userId_assignmentId_key";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "memberId" TEXT NULL;

UPDATE "Submission" s SET "memberId" = (
  SELECT m.id FROM "Member" m WHERE "userId" = s."userId" AND "classroomId" = (
    SELECT c.id FROM "Classroom" c
      JOIN "Category" cat ON cat."classroomId" = c.id
      JOIN "Resource" r ON r."categoryId" = cat.id
      JOIN "Assignment" a ON a.id = r.id
      JOIN "Submission" sub ON sub."assignmentId" = a.id
      WHERE s.id = sub.id
  )
);
ALTER TABLE "Submission" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Submission_memberId_assignmentId_key" ON "Submission"("memberId", "assignmentId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
