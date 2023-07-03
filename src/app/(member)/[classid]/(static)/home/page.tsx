import { Box } from "@/components/classroom/dashboard/Box";
import ControlButton from "@/components/classroom/dashboard/ControlButton";
import { CourseAbout } from "@/components/classroom/dashboard/CourseAbout";
import GameInfo from "@/components/classroom/dashboard/GameInfo";
import { PeopleList } from "@/components/classroom/dashboard/PeopleList";
import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageProps } from "@/types/next";
import { notFound } from "next/navigation";

type RankingItems = {
  username: string;
  xp: number;
}

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

  const members = await prisma.member.findMany({
    where: {
      classroomId: classId,
      inactive: false,
      userId: {
        not: classroomOwnerId?.ownerId,
      },
    },
  });
  const userList = await prisma.user.findMany({
    where: {
      id: {
        in: members.map((m) => m.userId),
      },
    },
  });

  const rankingItems: RankingItems[] = [
    ...userList.map((u) => {
      return {
        username: u.name,
        xp: members.find((m) => m.userId === u.id)?.xp ?? 0,
      };
    }),
  ];

  const isMember: boolean = userId !== classroomOwnerId!.ownerId

  if (!member || !classroomOwnerId) notFound();

  return (
    <div className="w-full p-16 overflow-y-auto">
      <ControlButton classId={ classId } />
      <div className="container max-w-3xl mx-auto flex flex-col space-y-4">
        <CourseAbout classId={ classId } />
        <GameInfo isMember={ isMember } member={ member } rankingList={ rankingItems } />
        <div className="flex flex-row space-x-4">
          <Box title="People" className="w-full">
            <PeopleList classId={ classId } />
          </Box>
        </div>
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
