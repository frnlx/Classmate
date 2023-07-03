"use client";

import { useClassroomQuery } from "@/api/client/classroom";
import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export function CourseAbout({ classId }: { classId: string }) {
  const { data, isLoading, isAdmin } = useClassroomQuery(classId);

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <>
      <div className="flex flex-col space-y-1 text-center justify-center">
        <h1 className="font-xl font-bold">{ data?.name }</h1>
        <span>Invite ID: { data?.inviteID }</span>
      </div>
      <div className="whitespace-pre-line bg-dark1 rounded-lg p-4 space-y-2">
        <p className="font-semibold text-xl">About</p>
        <div className="whitespace-pre-line">{ data?.description }</div>
      </div>
    </>
  );
}
