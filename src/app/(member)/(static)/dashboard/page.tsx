"use client";

import { useSessionRequired } from "@/api/client/auth";
import EditProfile from "@/components/home/dashboard/EditProfile";
import { SignOutButton } from "@/components/use-client/Auth";
import { PageProps } from "@/types/next";

export default async function DashboardPage({
  params,
  searchParams,
}: PageProps) {
  const user = useSessionRequired();
  const rand = Math.random();
  const date = new Date();

  return (
    <div className="w-full p-16 overflow-y-auto">
      <div className="container max-w-3xl mx-auto flex flex-col space-y-2 text-center">
        <span>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
        <h2>
          Good{" "}
          {date.getHours() < 12
            ? "morning"
            : date.getHours() < 18
            ? "afternoon"
            : "evening"}
          , {user.data?.user.name}
        </h2>

        <div className="flex flex-row space-x-2 justify-center">
          <EditProfile />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
