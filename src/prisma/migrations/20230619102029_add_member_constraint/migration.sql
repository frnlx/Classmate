/*
  Warnings:

  - A unique constraint covering the columns `[userId,classroomId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_classroomId_key" ON "Member"("userId", "classroomId");
