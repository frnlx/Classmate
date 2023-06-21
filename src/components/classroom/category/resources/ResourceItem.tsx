"use client";

import { useRoom } from "@/app/(member)/-Navbar/Navbar";
import { usePage } from "../../../../app/(member)/[classid]/-Sidebar/Pages";
import Link from "next/link";
import clsx from "clsx";
import { Chat, Note, NotePencil } from "@phosphor-icons/react";
import { Route } from "next";
import { Resource, ResourceType } from "@prisma/client";
import { usePathname } from "next/navigation";
import { ResourcePopulated } from "@/api/client/api";
import { formatDate, relativeTimeFromDates } from "@/lib/util";

export default function ResourceItem(p: {
  resource: ResourcePopulated;
  showStats: boolean;
}) {
  const path = usePathname();
  console.log(p);

  let rewardData: {
    xpReward: number;
    point: number;
  } | null = null;
  if (p.resource.type === ResourceType.ASSIGNMENT) {
    rewardData = p.resource.Assignment;
  } else if (p.resource.type === ResourceType.DISCUSSION) {
    rewardData = p.resource.Discussion;
  }

  const active = path.includes(p.resource.id);

  return (
    <div>
      <Link
        href={
          `/${path.split("/").slice(1, 3).join("/")}/${p.resource.id}` as Route
        }
      >
        <div
          className={ clsx(
            "flex flex-col gap-y-2 bg-dark1/80 hover:bg-dark2/40 hover:brightness-150 duration-150 transition-all pb-2 rounded-md",
            "px-4 pt-4",
            active ? "bg-dark2/40 brightness-150" : "",
            p.showStats ? "pb-2" : "pb-4"
          ) }
        >
          <div className={ clsx("flex flex-row items-center gap-2") }>
            <div className="p-2 rounded-xl bg-slate-700">
              { p.resource.type === ResourceType.NORMAL_POST ? (
                <Note className="text-2xl" />
              ) : p.resource.type === ResourceType.ASSIGNMENT ? (
                <NotePencil className="text-2xl" />
              ) : (
                <Chat className="text-2xl" />
              ) }
            </div>

            <div>
              <div className="text-slate-200">{ p.resource.title }</div>
              <div className="text-xs text-slate-600">
                { p.resource.type
                  .split("_")
                  .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
                  .join(" ") }{ " " }
                { " - " }
                { p.resource.type === ResourceType.ASSIGNMENT
                  ? `Due ${formatDate(new Date(p.resource.Assignment.dueDate))}`
                  : relativeTimeFromDates(new Date(p.resource.createdAt)) }
              </div>
            </div>
          </div>

          { p.showStats && (
            <div className="flex flex-row justify-between text-xs items-center">
              <div className="flex flex-row gap-x-2 text-sm text-light1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#71717a" viewBox="0 0 256 256"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H82.5a16,16,0,0,0-10.3,3.75l-.12.11L40,224V64H216Z"></path></svg>
                { p.resource._count.Comment }
              </div>

              { rewardData && (
                <span className="ml-auto text-sm text-light1">
                  <div className="flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#71717a" viewBox="0 0 256 256"><path d="M229.5,113,166.07,90,143,26.5a16,16,0,0,0-30,0L90,89.93,26.5,113a16,16,0,0,0,0,30l63.43,23L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30Zm-68.93,38a16,16,0,0,0-9.54,9.54L128,223.9l-23-63.33A16,16,0,0,0,95.43,151L32.1,128l63.33-23A16,16,0,0,0,105,95.43L128,32.1l23,63.33a16,16,0,0,0,9.54,9.54l63.33,23Z"></path></svg>
                    <div className="px-1"></div>
                    { rewardData.xpReward }
                    <div className="px-2"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#71717a" viewBox="0 0 256 256"><path d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"></path></svg>
                    <div className="px-1"></div>
                    { rewardData.point }
                  </div>
                </span>
              ) }
            </div>
          ) }
        </div>
      </Link>
    </div>
  );
}
