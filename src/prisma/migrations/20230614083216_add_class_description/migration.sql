/*
  Warnings:

  - Added the required column `description` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "description" TEXT NULL;
UPDATE "Classroom" SET "description" = '';
ALTER TABLE "Classroom" ALTER COLUMN "description" SET NOT NULL;