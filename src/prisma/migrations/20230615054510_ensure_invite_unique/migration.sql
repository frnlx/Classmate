/*
  Warnings:

  - A unique constraint covering the columns `[inviteID]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Classroom_inviteID_key" ON "Classroom"("inviteID");
