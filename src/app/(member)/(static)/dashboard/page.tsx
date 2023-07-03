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
  const date = new Date();

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <div className="w-full space-y-12">
        <div className="flex flex-row w-full p-4 justify-between">
          <div></div>
          <div className="flex flex-row space-x-4 content-center">
            <div className="">
              <EditProfile />
            </div>
            <div>
              <SignOutButton />
            </div>
          </div>
        </div>
        <div className="container max-w-3xl mx-auto flex flex-col space-y-2 text-center">
          <span>
            { date.toLocaleDateString("en-SG", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }) }
          </span>
          <h2>
            Good{ " " }
            { date.getHours() < 12
              ? "morning"
              : date.getHours() < 18
                ? "afternoon"
                : "evening" }
            , { user.data?.user.name }
          </h2>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
