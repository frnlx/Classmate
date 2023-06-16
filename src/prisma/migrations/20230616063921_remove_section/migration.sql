/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_categoryId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "sectionId";

-- DropTable
DROP TABLE "Section";
