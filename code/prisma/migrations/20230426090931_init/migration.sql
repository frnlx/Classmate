/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToUser" DROP CONSTRAINT "_ClassToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToUser" DROP CONSTRAINT "_ClassToUser_B_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "_ClassToUser";

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassroomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomToUser_AB_unique" ON "_ClassroomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomToUser_B_index" ON "_ClassroomToUser"("B");

-- AddForeignKey
ALTER TABLE "_ClassroomToUser" ADD CONSTRAINT "_ClassroomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToUser" ADD CONSTRAINT "_ClassroomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
