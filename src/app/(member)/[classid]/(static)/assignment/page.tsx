import Header from "@/components/classroom/assignment/Header";
import ResourceItem from "@/components/classroom/category/resources/ResourceItem";
import { prisma } from "@/lib/db";
import { PageProps } from "@/types/next";
import { ResourceType } from "@prisma/client";

export default async function ClassAssignmentPage({
  params,
  searchParams,
}: PageProps) {
  const classId = params!.classid as string;
  const data = await prisma.resource.findMany({
    where: {
      category: {
        classroomId: classId,
      },
      type: ResourceType.ASSIGNMENT,
      Assignment: {
        dueDate: {
          lte: new Date(),
        },
      },
    },
    include: {
      Assignment: true,
      _count: {
        select: { Comment: true },
      },
    },
    orderBy: {
      Assignment: {
        dueDate: "desc",
      },
    },
  });

  return (
    <div className="m-8 flex flex-col gap-4 w-full h-max">
      <Header />
      <div className="flex flex-col gap-2 flex-none basis-1/3">
        { data?.map((resources) => (
          /* @ts-ignore */
          <ResourceItem key={ resources.id } resource={ resources } />
        )) }
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
