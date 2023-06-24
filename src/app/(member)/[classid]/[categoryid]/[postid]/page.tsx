import { PageProps } from "@/types/next";
import { prisma } from "@/lib/db";
import { ResourceType } from "@prisma/client";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth";
import PostHeader from "@/components/classroom/category/post/PostHeader";
import CommentSection from "@/components/classroom/category/post/CommentSection";
import PostContent from "@/components/classroom/category/post/PostContent";
import SubmitAssignment from "@/components/classroom/category/post/SubmitAssignment";
import { ClientDate } from "@/components/use-client/ClientDate";

export default async function PostLayout({ params }: PageProps) {
  const userId = await getUserId();
  const postId = params!.postid as string;
  const classId = params!.classid as string;

  // Well aware that _count is not there, but using Omit or making another type is tiring
  const resource = await prisma.resource.findUnique({
    where: { id: postId },
    include: {
      Assignment: true,
      Discussion: true,
      Comment: {
        include: { user: true },
      },
      attachment: true,
      user: true,
    },
  });

  const classroom = await prisma.classroom.findUnique({
    where: { id: classId },
  });

  if (!resource || !classroom) throw notFound();

  const member = await prisma.member.findUnique({
    where: {
      userId_classroomId: {
        userId: userId,
        classroomId: classId,
      },
    },
  });

  if (!member) throw notFound();

  const submission = await prisma.submission.findUnique({
    where: {
      memberId_assignmentId: {
        memberId: member.id,
        assignmentId: postId,
      },
    },
    include: { attachment: true },
  });

  let rewardDueData;
  if (resource.type === ResourceType.ASSIGNMENT) {
    rewardDueData = resource.Assignment;
  } else if (resource.type === ResourceType.DISCUSSION) {
    rewardDueData = resource.Discussion;
  }
  return (
    <div className="p-4 w-full rounded-md flex flex-col gap-y-3 bg-dark1 relative h-full" >
      <PostHeader
        /* @ts-ignore */
        resource={ resource }
        classId={ classId }
        isOwner={ userId === classroom.ownerId }
      />
      <div className="flex justify-between">
        <div>
          { rewardDueData && (
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256"><path d="M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z" opacity="0.2"></path><path d="M128,32a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,32Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,208ZM61.66,29.66l-32,32A8,8,0,0,1,18.34,50.34l32-32A8,8,0,1,1,61.66,29.66Zm176,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,237.66,61.66ZM184,120a8,8,0,0,1,0,16H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48Z"></path></svg>
              <div className="p-1"></div>
              < ClientDate data={ rewardDueData.dueDate } />
            </div>
          ) }
        </div>
        { rewardDueData && (
          <div className="flex flex-row">
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256"><path d="M226.76,135.48l-63.45,23.07a8,8,0,0,0-4.76,4.76l-23.07,63.45a8,8,0,0,1-15,0L97.45,163.31a8,8,0,0,0-4.76-4.76L29.24,135.48a8,8,0,0,1,0-15L92.69,97.45a8,8,0,0,0,4.76-4.76l23.07-63.45a8,8,0,0,1,15,0l23.07,63.45a8,8,0,0,0,4.76,4.76l63.45,23.07A8,8,0,0,1,226.76,135.48Z" opacity="0.2"></path><path d="M229.5,113,166.07,90,143,26.5a16,16,0,0,0-30,0L90,89.93,26.5,113a16,16,0,0,0,0,30l63.43,23L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30Zm-68.93,38a16,16,0,0,0-9.54,9.54L128,223.9l-23-63.33A16,16,0,0,0,95.43,151L32.1,128l63.33-23A16,16,0,0,0,105,95.43L128,32.1l23,63.33a16,16,0,0,0,9.54,9.54l63.33,23Z"></path></svg>
              <div className="p-1"></div>
              { rewardDueData.xpReward } XP
            </div>
            <div className="px-2"></div>
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256"><path d="M240,132c0,19.88-35.82,36-80,36-19.6,0-37.56-3.17-51.47-8.44h0C146.76,156.85,176,142,176,124V96.72h0C212.52,100.06,240,114.58,240,132ZM176,84c0-19.88-35.82-36-80-36S16,64.12,16,84s35.82,36,80,36S176,103.88,176,84Z" opacity="0.2"></path><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
              <div className="p-1"></div>
              { rewardDueData.point } points
            </div>

          </div>

        ) }
      </div>
      <PostContent resource={ resource } />
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      { userId !== classroom.ownerId &&
        resource.type === ResourceType.ASSIGNMENT && (
          <>
            <div className="flex flex-col gap-2">
              <SubmitAssignment
                classId={ classId }
                resource={ resource }
                submission={ submission }
                assignment={ resource.Assignment! }
              />
            </div>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </>
        ) }
      {/* @ts-ignore */ }
      <CommentSection classId={ classId } resource={ resource } />
    </div>
  );
}

export const dynamic = "force-dynamic";
