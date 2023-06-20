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
      <div className="flex flex-row gap-x-4 h-40">
        <div className="flex flex-col gap-1 basis-1/4 shrink-0 h-max-full">
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
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M228.13,116.77,164.67,93.69a3.94,3.94,0,0,1-2.36-2.36L139.23,27.87a11.95,11.95,0,0,0-22.46,0L93.69,91.33a3.94,3.94,0,0,1-2.36,2.36L27.87,116.77a11.95,11.95,0,0,0,0,22.46l63.46,23.08a3.94,3.94,0,0,1,2.36,2.36l23.08,63.46a11.95,11.95,0,0,0,22.46,0l23.08-63.46h0a3.94,3.94,0,0,1,2.36-2.36l63.46-23.08a11.95,11.95,0,0,0,0-22.46Zm-2.73,15-63.46,23.07a11.93,11.93,0,0,0-7.15,7.15L131.72,225.4a4,4,0,0,1-7.44,0l-23.07-63.46a11.93,11.93,0,0,0-7.15-7.15L30.6,131.72a4,4,0,0,1,0-7.44l63.46-23.07a11.93,11.93,0,0,0,7.15-7.15L124.28,30.6a4,4,0,0,1,7.44,0l23.07,63.46a11.93,11.93,0,0,0,7.15,7.15l63.46,23.07a4,4,0,0,1,0,7.44Z"></path></svg>
            <div className="p-1"></div>
            { assignment.xpReward }
          </div>
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M180,93.11V84c0-22.43-36.9-40-84-40S12,61.57,12,84v40c0,19.14,26.86,34.72,64,38.89V172c0,22.43,36.9,40,84,40s84-17.57,84-40V132C244,113.12,217.87,97.37,180,93.11ZM236,132c0,15.45-30.54,32-76,32a165.71,165.71,0,0,1-28-2.34v-1.39c28.61-6.31,48-20,48-36.27V101.17C212.22,105,236,117.93,236,132ZM108.19,155.59Q102.3,156,96,156c-5.47,0-10.72-.25-15.73-.69l-.27,0h0c-4.16-.38-8.16-.9-12-1.56V121.8A174.87,174.87,0,0,0,96,124a174.87,174.87,0,0,0,28-2.2v31.92a155,155,0,0,1-15.52,1.85ZM172,101.32V124c0,10.88-15.16,22.3-40,28.11V120.27C149.63,116.38,163.75,109.69,172,101.32ZM96,52c45.46,0,76,16.55,76,32s-30.54,32-76,32S20,99.45,20,84,50.54,52,96,52ZM20,124V101.32c8.25,8.37,22.37,15.06,40,19v31.84C35.16,146.3,20,134.88,20,124Zm64,48v-8.4c3.91.26,7.92.4,12,.4s8.06-.14,12-.39a123.93,123.93,0,0,0,16,4.63v31.87C99.16,194.3,84,182.88,84,172Zm48,29.72V169.77A174.48,174.48,0,0,0,160,172a174.87,174.87,0,0,0,28-2.2v31.92a173.07,173.07,0,0,1-56,0ZM236,172c0,10.88-15.16,22.3-40,28.11V168.27c17.63-3.89,31.75-10.58,40-19Z"></path></svg>
            <div className="p-1"></div>
            { assignment.point }
          </div>
          <div className="flex flex-row text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" viewBox="0 0 256 256"><path d="M128,36a92,92,0,1,0,92,92A92.1,92.1,0,0,0,128,36Zm0,176a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM58.83,26.83l-32,32a4,4,0,0,1-5.66-5.66l32-32a4,4,0,0,1,5.66,5.66Zm176,32a4,4,0,0,1-5.66,0l-32-32a4,4,0,0,1,5.66-5.66l32,32A4,4,0,0,1,234.83,58.83ZM188,128a4,4,0,0,1-4,4H128a4,4,0,0,1-4-4V72a4,4,0,0,1,8,0v52h52A4,4,0,0,1,188,128Z"></path>
            </svg>
            <div className="p-1"></div>
            { assignment.dueDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
            ) }
          </div>
          { assignment.resource.attachment && (
            <div className="flex flex-row text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256"><path d="M206.83,125.17a4,4,0,0,1,0,5.66l-82.06,82a52,52,0,0,1-73.54-73.55L150.52,38.55a36,36,0,1,1,50.94,50.9l-99.3,100.69a20,20,0,1,1-28.3-28.27l83.29-84.68a4,4,0,1,1,5.7,5.61L79.54,167.5a12,12,0,1,0,16.95,17L195.78,83.81A28,28,0,1,0,156.2,44.18L56.91,144.87a44,44,0,1,0,62.21,62.26l82-82A4,4,0,0,1,206.83,125.17Z"></path></svg>
              <div className="p-1"></div>
              <Attachment attachment={ assignment.resource.attachment } />
            </div>
          ) }
        </div>
        <div className="flex flex-col gap-2 basis-3/4 shrink-0">
          <div className="font-bold text-xl">Assignment Description</div>
          <p className="whitespace-pre-line break-words overflow-y-auto bg-dark1 rounded-lg py-2 pl-2">
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
