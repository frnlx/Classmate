import { Box } from "@/components/classroom/dashboard/Box";
import ControlButton from "@/components/classroom/dashboard/ControlButton";
import { CourseAbout } from "@/components/classroom/dashboard/CourseAbout";
import MemberLevel from "@/components/classroom/dashboard/MemberLevel";
import { PeopleList } from "@/components/classroom/dashboard/PeopleList";
import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageProps } from "@/types/next";
import { notFound } from "next/navigation";

export default async function ClassHomePage({
  params,
  searchParams,
}: PageProps) {
  const userId = await getUserId();
  const classId = params!.classid as string;
  const member = await prisma.member.findUnique({
    where: {
      userId_classroomId: {
        userId: userId,
        classroomId: classId,
      },
    },
  });
  const classroomOwnerId = await prisma.classroom.findUnique({
    where: {
      id: classId,
    },
    select: { ownerId: true },
  });

  if (!member || !classroomOwnerId) notFound();

  return (
    <div className="w-full p-16 overflow-y-auto">
      <ControlButton classId={classId} />
      <div className="container max-w-3xl mx-auto flex flex-col space-y-2">
        <CourseAbout classId={classId} />
        {userId !== classroomOwnerId.ownerId && <MemberLevel member={member} />}
        <div className="flex flex-row space-x-4">
          {/* <Box title="Assignments" className="basis-1/2" /> */}
          <Box title="People" className="w-full">
            <PeopleList classId={classId} />
          </Box>
        </div>
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
