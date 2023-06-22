-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "graded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rewarded" BOOLEAN NOT NULL DEFAULT false;
