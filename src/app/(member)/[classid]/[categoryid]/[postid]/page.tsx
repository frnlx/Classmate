import { PageProps } from "@/types/next";
import { prisma } from "@/lib/db";
import { Category, ResourceType } from "@prisma/client";
import { notFound } from "next/navigation";
import { prefetch } from "@/api/caching/prefetch";
import { color } from "@/lib/logger/chalk";
import { getUserId } from "@/lib/auth";
import { Header } from "@/components/classroom/category/resources/Header";
import PostHeader from "@/components/classroom/category/post/PostHeader";
import {
  ResourcePopulatedWithUser,
  ResourcePopulatedWithUserComment,
} from "@/api/client/api";
import CommentSection from "@/components/classroom/category/post/CommentSection";
import Link from "next/link";
import { getServerSession } from "next-auth";
import PostContent from "@/components/classroom/category/post/PostContent";
import SubmitAssignment from "@/components/classroom/category/post/SubmitAssignment";

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
    <div className="p-4 w-full rounded-md overflow-y-auto flex flex-col gap-y-4 bg-dark1 relative h-pc80" >
      <PostHeader
        /* @ts-ignore */
        resource={ resource }
        classId={ classId }
        isOwner={ userId === classroom.ownerId }
      />
      <div className="flex justify-between text-sm text-light1">
        <div>
          { rewardDueData && (
            <div className="flex flex-row text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M128,36a92,92,0,1,0,92,92A92.1,92.1,0,0,0,128,36Zm0,176a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM58.83,26.83l-32,32a4,4,0,0,1-5.66-5.66l32-32a4,4,0,0,1,5.66,5.66Zm176,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66l32,32A4,4,0,0,1,234.83,58.83ZM188,128a4,4,0,0,1-4,4H128a4,4,0,0,1-4-4V72a4,4,0,0,1,8,0v52h52A4,4,0,0,1,188,128Z"></path>
              </svg>
              <div className="p-1"></div>
              { rewardDueData.dueDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
              ) }
            </div>
          ) }
        </div>
        { rewardDueData && (
          <div className="flex flex-row">
            <div className="flex flex-row text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M228.13,116.77,164.67,93.69a3.94,3.94,0,0,1-2.36-2.36L139.23,27.87a11.95,11.95,0,0,0-22.46,0L93.69,91.33a3.94,3.94,0,0,1-2.36,2.36L27.87,116.77a11.95,11.95,0,0,0,0,22.46l63.46,23.08a3.94,3.94,0,0,1,2.36,2.36l23.08,63.46a11.95,11.95,0,0,0,22.46,0l23.08-63.46h0a3.94,3.94,0,0,1,2.36-2.36l63.46-23.08a11.95,11.95,0,0,0,0-22.46Zm-2.73,15-63.46,23.07a11.93,11.93,0,0,0-7.15,7.15L131.72,225.4a4,4,0,0,1-7.44,0l-23.07-63.46a11.93,11.93,0,0,0-7.15-7.15L30.6,131.72a4,4,0,0,1,0-7.44l63.46-23.07a11.93,11.93,0,0,0,7.15-7.15L124.28,30.6a4,4,0,0,1,7.44,0l23.07,63.46a11.93,11.93,0,0,0,7.15,7.15l63.46,23.07a4,4,0,0,1,0,7.44Z"></path></svg>
              <div className="p-1"></div>
              { rewardDueData.xpReward }
            </div>
            <div className="px-2"></div>
            <div className="flex flex-row text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M180,93.11V84c0-22.43-36.9-40-84-40S12,61.57,12,84v40c0,19.14,26.86,34.72,64,38.89V172c0,22.43,36.9,40,84,40s84-17.57,84-40V132C244,113.12,217.87,97.37,180,93.11ZM236,132c0,15.45-30.54,32-76,32a165.71,165.71,0,0,1-28-2.34v-1.39c28.61-6.31,48-20,48-36.27V101.17C212.22,105,236,117.93,236,132ZM108.19,155.59Q102.3,156,96,156c-5.47,0-10.72-.25-15.73-.69l-.27,0h0c-4.16-.38-8.16-.9-12-1.56V121.8A174.87,174.87,0,0,0,96,124a174.87,174.87,0,0,0,28-2.2v31.92a155,155,0,0,1-15.52,1.85ZM172,101.32V124c0,10.88-15.16,22.3-40,28.11V120.27C149.63,116.38,163.75,109.69,172,101.32ZM96,52c45.46,0,76,16.55,76,32s-30.54,32-76,32S20,99.45,20,84,50.54,52,96,52ZM20,124V101.32c8.25,8.37,22.37,15.06,40,19v31.84C35.16,146.3,20,134.88,20,124Zm64,48v-8.4c3.91.26,7.92.4,12,.4s8.06-.14,12-.39a123.93,123.93,0,0,0,16,4.63v31.87C99.16,194.3,84,182.88,84,172Zm48,29.72V169.77A174.48,174.48,0,0,0,160,172a174.87,174.87,0,0,0,28-2.2v31.92a173.07,173.07,0,0,1-56,0ZM236,172c0,10.88-15.16,22.3-40,28.11V168.27c17.63-3.89,31.75-10.58,40-19Z"></path></svg>
              <div className="p-1"></div>
              { rewardDueData.point }
            </div>

          </div>

        ) }
      </div>
      <PostContent resource={ resource } />
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      { userId !== classroom.ownerId &&
        resource.type === ResourceType.ASSIGNMENT && (
          <>
            <SubmitAssignment
              classId={ classId }
              resource={ resource }
              submission={ submission }
              assignment={ resource.Assignment! }
            />
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
          </>
        ) }
      {/* @ts-ignore */ }
      <CommentSection classId={ classId } resource={ resource } />
    </div>
  );
}

export const dynamic = "force-dynamic";
