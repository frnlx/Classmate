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
import RewardManageTable from "@/components/classroom/rewards/RewardManageTable";

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
      Reward: {
        orderBy: {
          createdAt: "asc",
        },
      }
    },
  });

  if (!classroomRewards) notFound();
  const isOwner = userId === classroomRewards.ownerId;
  const whereClause = isOwner
    ? {
      classroom: {
        id: classId,
      },
    }
    : {
      member: {
        user: {
          id: userId,
        },
      },
      classroom: {
        id: classId,
      }
    };
  const memberRewards = await prisma.memberReward.findMany({
    where: whereClause,
    include: {
      member: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      claimDate: "desc",
    },
  });

  console.log(whereClause, memberRewards);

  let member = null;
  if (!isOwner) {
    member = await prisma.member.findUnique({
      where: {
        userId_classroomId: {
          userId: userId,
          classroomId: classId,
        },
      },
    });
  }

  return (
    <div className="m-8 flex flex-col gap-4 w-full h-max">
      <header className="flex flex-row gap-x-4 items-center p-4 w-full">
        <div className="p-4 rounded-md bg-dark1">
          <Storefront className="text-light1 font-semibold" size={ 32 } />
        </div>
        <div className="text-slate-100 text-3xl font-bold ">
          { isOwner ? "Rewards" : "Rewards Redemption" }
        </div>

        <div className="ml-auto">
          { isOwner ? (
            <ManageRewards
              rewards={ classroomRewards.Reward }
              classId={ classId }
            />
          ) : (
            <RewardsHistory rewards={ memberRewards } classId={ classId } />
          ) }
        </div>
      </header>

      <div className="flex flex-col gap-2 overflow-auto">
        { isOwner ? (
          <RewardManageTable
            rewardRequests={ memberRewards }
            classId={ classId }
            isOwner={ true }
          />
        ) : (
          <>
            <div className="flex flex-row text-sm bg-dark1 rounded-lg p-4 w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
              <div className="p-1"></div>
              <p>{ member?.points } points available</p>
            </div>
            <RewardsTable
              rewards={ classroomRewards.Reward }
              isOwner={ isOwner }
              classId={ classId }
              member={ member! }
            />
          </>
        ) }
      </div>
    </div>
  );
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
