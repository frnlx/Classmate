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
                <Chat /> { p.resource._count.Comment }
              </div>

              { rewardData && (
                <span className="ml-auto text-sm text-light1">
                  +{ rewardData.point } Point | +{ rewardData.xpReward } XP
                </span>
              ) }
            </div>
          ) }
        </div>
      </Link>
    </div>
  );
}
