-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_id_fkey";

-- DropForeignKey
ALTER TABLE "NormalPost" DROP CONSTRAINT "NormalPost_id_fkey";

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_id_fkey" FOREIGN KEY ("id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_id_fkey" FOREIGN KEY ("id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormalPost" ADD CONSTRAINT "NormalPost_id_fkey" FOREIGN KEY ("id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
