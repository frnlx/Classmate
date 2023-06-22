/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attachmentId]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attachmentId]` on the table `Submission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "attachmentId" TEXT;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "fileUrl",
ADD COLUMN     "attachmentId" TEXT;

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "filename" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_attachmentId_key" ON "Resource"("attachmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_attachmentId_key" ON "Submission"("attachmentId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
