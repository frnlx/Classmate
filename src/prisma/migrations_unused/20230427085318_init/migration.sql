-- CreateTable
CREATE TABLE "ClassInvites" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "invite_link" TEXT NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClassInvites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassInvites" ADD CONSTRAINT "ClassInvites_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
