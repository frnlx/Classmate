"use client";

import { useClassroomQuery } from "@/api/client/classroom";
import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export function CourseAbout({ classId }: { classId: string }) {
  const { data, isLoading } = useClassroomQuery(classId);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <>
      <div className="flex flex-col space-y-1 text-center justify-center">
        <h1 className="font-xl font-bold">{data?.name}</h1>
        <p>{data?.ownerId}</p>
      </div>

      <span className="font-light text-gray-500">About</span>
      <p>{data?.description}</p>
    </>
  );
}
