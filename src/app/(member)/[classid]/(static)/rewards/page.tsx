import Header from "@/components/classroom/assignment/Header";
import ResourceItem from "@/components/classroom/category/resources/ResourceItem";
import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageProps } from "@/types/next";
import { Storefront } from "@/components/use-client/Icons";
import { ResourceType } from "@prisma/client";
import { notFound } from "next/navigation";
import RewardsTable from "@/components/classroom/rewards/RewardsTable";
import ManageRewards from "@/components/classroom/rewards/ManageRewards";
import RewardsHistory from "@/components/classroom/rewards/RewardsHistory";

export default async function ClassRewardsPage({
  params,
  searchParams,
}: PageProps) {
  const classId = params!.classid as string;
  const userId = await getUserId();
  const classroomRewards = await prisma.classroom.findUnique({
    where: {
      id: classId,
    },
    include: {
      Reward: true,
    },
  });

  if (!classroomRewards) notFound();

  const isOwner = userId === classroomRewards.ownerId;
  return (
    <div className="m-8 flex flex-col gap-4 w-full h-max">
      <header className="flex flex-row gap-x-4 items-center p-4 w-full">
        <div className="p-4 rounded-md bg-dark1">
          <Storefront className="text-light1 font-semibold" size={32} />
        </div>
        <div className="text-slate-100 text-3xl font-bold ">
          {isOwner ? "Rewards" : "Rewards Redemption"}
        </div>

        <div className="justify-self-end">
          {isOwner ? (
            <ManageRewards
              rewards={classroomRewards.Reward}
              classId={classId}
            />
          ) : (
            <RewardsHistory />
          )}
        </div>
      </header>

      <div className="flex flex-row space-x-4 overflow-auto">
        {isOwner ? (
          <RewardsTable
            rewards={classroomRewards.Reward}
            isOwner={isOwner}
            classId={classId}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
