import { PageProps } from "@/types/next";
import { prisma } from "@/lib/db";
import { Category, ResourceType } from "@prisma/client";
import { notFound } from "next/navigation";
import { prefetch } from "@/api/caching/prefetch";
import { color } from "@/lib/logger/chalk";
import { getUserId } from "@/lib/auth";
import { HashStraight, Paperclip } from "@phosphor-icons/react";
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

export default async function PostLayout({ params }: PageProps) {
  const session = await getServerSession();
  const postId = params!.postid as string;
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

  if (!resource) throw notFound();

  let rewardDueData;
  if (resource.type === ResourceType.ASSIGNMENT) {
    rewardDueData = resource.Assignment;
  } else if (resource.type === ResourceType.DISCUSSION) {
    rewardDueData = resource.Discussion;
  }
  return (
    <div className="p-4 w-full rounded-md overflow-y-auto flex flex-col gap-y-4 bg-dark1 relative h-fit">
      {/* @ts-ignore */}
      <PostHeader resource={resource} classId={params!.classid as string} />
      <p>
        {resource.type
          .split("_")
          .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(" ")}{" "}
        {rewardDueData && (
          <>
            | +{rewardDueData.point} Point | +{rewardDueData.xpReward} XP
          </>
        )}
      </p>

      {rewardDueData && (
        <strong>
          Due:{" "}
          {rewardDueData.dueDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </strong>
      )}

      <PostContent resource={resource} />
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      {/* @ts-ignore */}
      <CommentSection classId={params!.classid as string} resource={resource} />
    </div>
  );
}

export const dynamic = "force-dynamic";
