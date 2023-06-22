/*
  Warnings:

  - Added the required column `xpReward` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xpReward` to the `Discussion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "xpReward" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Discussion" ADD COLUMN     "xpReward" INTEGER NOT NULL;
