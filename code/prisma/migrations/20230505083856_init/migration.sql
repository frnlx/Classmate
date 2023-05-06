/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_sectionId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sectionId" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
