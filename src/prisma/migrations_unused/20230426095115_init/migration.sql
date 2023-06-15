/*
  Warnings:

  - Added the required column `ownerId` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerIdss` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "ownerIdss" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
