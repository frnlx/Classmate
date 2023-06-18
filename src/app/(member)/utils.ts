import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { color } from "@/lib/logger/chalk";
import { cache } from "react";

export const getClassroomData = cache(async (classid: string) => {
  return await prisma.classroom.findFirst({
    where: {
      id: classid,
      members: {
        some: {
          id: await getUserId(),
        },
      },
    },
    include: {
      categories: true,
    },
  });
});

export const getUserData = cache(async (userid: string) => {
  color.green("User data fetched fresh");
  return await prisma.user.findUnique({
    where: {
      id: userid,
    },
    include: {
      memberClasses: {
        where: {
          inactive: false,
        },
        include: {
          classroom: {
            include: {
              categories: true,
            },
          },
        },
      },
    },
  });
});
