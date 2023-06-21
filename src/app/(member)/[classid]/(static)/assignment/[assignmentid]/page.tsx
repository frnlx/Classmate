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
        <div className="flex flex-col gap-1 basis-1/4 shrink-0 h-max-full">
          <header className="text-xl font-bold">
            { assignment.resource.title }
          </header>
          <span className="text-sm -mt-1 text-light1">
            Posted { formatDate(new Date(assignment.resource.createdAt)) }
          </span>
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M229.5,113,166.07,90,143,26.5a16,16,0,0,0-30,0L90,89.93,26.5,113a16,16,0,0,0,0,30l63.43,23L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30Zm-68.93,38a16,16,0,0,0-9.54,9.54L128,223.9l-23-63.33A16,16,0,0,0,95.43,151L32.1,128l63.33-23A16,16,0,0,0,105,95.43L128,32.1l23,63.33a16,16,0,0,0,9.54,9.54l63.33,23Z"></path></svg>
            <div className="p-1"></div>
            { assignment.xpReward } XP
          </div>
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
            <div className="p-1"></div>
            { assignment.point } point{ assignment.point === 1 ? '' : 's' }
          </div>
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M128,32a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,32Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,208ZM61.66,29.66l-32,32A8,8,0,0,1,18.34,50.34l32-32A8,8,0,1,1,61.66,29.66Zm176,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,237.66,61.66ZM184,120a8,8,0,0,1,0,16H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48Z"></path></svg>
            <div className="p-1"></div>
            { formatDate(new Date(assignment.dueDate)) }
          </div>
          { assignment.resource.attachment && (
            <div className="flex flex-row text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105,193A24,24,0,1,1,71,159L154.3,74.38A8,8,0,1,1,165.7,85.6L82.39,170.31a8,8,0,1,0,11.27,11.36L192.93,81A24,24,0,1,0,159,47L59.76,147.68a40,40,0,1,0,56.53,56.62l82.06-82A8,8,0,0,1,209.66,122.34Z"></path></svg>
              <div className="p-1"></div>
              <Attachment attachment={ assignment.resource.attachment } />
            </div>
          ) }
        </div>
        <div className="flex flex-col gap-2 basis-3/4 shrink-0">
          <div className="font-bold text-xl">Assignment Description</div>
          <p className="whitespace-pre-line break-words overflow-y-auto bg-dark2/50 rounded-lg p-2 h-40">
            { assignment.resource.content }
          </p>
        </div>
      </div>
      <hr className="h-px"></hr>
      <SearchFilterContextProvider>
        <div className="flex flex-row justify-between">
          <div className="text-xl font-bold">Submissions</div>
          <SearchFilter />
        </div>
        {/* @ts-ignore */ }
        <SubmissionTable submissions={ assignment.Submission } />
      </SearchFilterContextProvider>
    </div>
  );
}
