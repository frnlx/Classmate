/*
  Warnings:

  - You are about to drop the `ClassInvites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inviteID` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassInvites" DROP CONSTRAINT "ClassInvites_classroomId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "inviteID" TEXT NOT NULL;

-- DropTable
DROP TABLE "ClassInvites";
