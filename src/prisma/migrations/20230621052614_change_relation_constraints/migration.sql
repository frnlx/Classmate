-- DropForeignKey
ALTER TABLE "MemberReward" DROP CONSTRAINT "MemberReward_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_memberId_fkey";

-- AddForeignKey
ALTER TABLE "MemberReward" ADD CONSTRAINT "MemberReward_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
