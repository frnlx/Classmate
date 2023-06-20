"use client";

import { useCategoryResources } from "@/api/client/resource";
import { useRoom } from "@/app/(member)/-Navbar/Navbar";
import { Resource } from "@prisma/client";
import { usePage } from "../../../../app/(member)/[classid]/-Sidebar/Pages";
import ResourceItem from "./ResourceItem";
import { Spinner } from "@chakra-ui/react";
import { Info } from "@phosphor-icons/react";

export function ResourceList(p: { prefetchedData?: Resource[] }) {
  const room = useRoom();
  const page = usePage();
  const { data, isLoading, error } = useCategoryResources(
    room.currentId,
    page.currentid
  );

  // sort data by createdAt
  const sortedData = data?.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="mx-auto min-w-1/3">
        <Spinner />
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 mx-auto">
        <Info size={ 48 } />
        <p>There is nothing here!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 flex-none basis-1/3 overflow-hidden hover:overflow-y-scroll pr-1 max-h-pc80">
      { sortedData?.map((resources) => (
        /* @ts-ignore */
        <ResourceItem key={ resources.id } resource={ resources } showStats />
      )) }
    </div>
  );
}
