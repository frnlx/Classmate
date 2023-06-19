import { notFound } from "@/api/responses";
import Header from "@/components/classroom/assignment/Header";
import ResourceItem from "@/components/classroom/category/resources/ResourceItem";
import { prisma } from "@/lib/db";
import { PageProps } from "@/types/next";
import { ArrowLeft } from "@/components/use-client/Icons";
import { ResourceType } from "@prisma/client";
import Link from "next/link";
import { formatDate } from "@/lib/util";
import Attachment from "@/components/classroom/category/post/Attachment";
import { SearchFilterContextProvider } from "@/components/classroom/assignment/SearchFilterContext";
import SearchFilter from "@/components/classroom/assignment/SearchFilter";
import SubmissionTable from "@/components/classroom/assignment/SubmissionTable";

export default async function AssignmentMarkPage({
  params,
  searchParams,
}: PageProps) {
  const assignmentId = params!.assignmentid as string;
  const classId = params!.classid as string;

  const assignment = await prisma.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      resource: {
        include: {
          attachment: true,
        },
      },
      Submission: {
        include: {
          attachment: true,
          member: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  if (!assignment) notFound();

  return (
    <div className="m-8 flex flex-col gap-4 w-full h-max">
      <Link
        href={ `/${classId}/assignment` }
        className="flex flex-row items-center gap-x-4 text-light1 hover:brightness-150 duration-100"
      >
        <ArrowLeft size={ 32 } />
        <span className="font-semibold">Return to submissions list</span>
      </Link>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col gap-1 basis-1/2">
          <header className="text-xl font-bold">
            { assignment.resource.title }
          </header>
          <span className="text-sm -mt-1 text-light1">
            Posted at { assignment.resource.createdAt.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }) }
          </span>
          <p className="text-sm">XP Gain: { assignment.xpReward }</p>
          <p className="text-sm">Points Gain: { assignment.point }</p>
          <p className="text-sm">Due { assignment.dueDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
          ) }</p>
          { assignment.resource.attachment && (
            <>
              <p>Attachment</p>
              <Attachment attachment={ assignment.resource.attachment } />
            </>
          ) }
        </div>
        <div className="flex flex-col gap-2">
          <div className="font-bold text-xl">Assignment Description</div>
          <p className="whitespace-pre-line break-words basis-1/2">
            { assignment.resource.content }
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold">Submissions</h2>
      <SearchFilterContextProvider>
        <SearchFilter />
        {/* @ts-ignore */ }
        <SubmissionTable submissions={ assignment.Submission } />
      </SearchFilterContextProvider>
    </div>
  );
}
