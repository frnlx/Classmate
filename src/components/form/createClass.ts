"use server";

import { InferedCreateClassroomFormSchema } from "./CreateClassForm";
import { AuthOptions, CallbacksOptions, Session } from "next-auth";
import { color } from "@/lib/logger/chalk";
import { authOptions } from "@/configs/auth";
import { cookies, headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { AuthHandler } from "next-auth/core";
// @ts-ignore
import { serialize } from "cookie";
import { Cookie } from "next-auth/core/lib/cookie";
import { getServerActionSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function SAcreateClass(values: InferedCreateClassroomFormSchema) {
  color.yellow("SA Create Class");

  const session = await getServerActionSession(authOptions);

  if (!session) redirect("/auth");

  console.log(session);

  const classroom = await prisma.classroom.create({
    data: {
      name: values.name,
      emoji: values.emoji,
      members: {
        create: { userId: session.user.id }, // will throw if not found
      },
      owner: {
        connect: { id: session.user.id }, // will throw if not found
      },
      inviteID: nanoid(6),
      categories: {
        create: [
          {
            title: "First Category",
          },
        ],
      },
      description: "No Description",
    },
  });
  // revalidatePath('/')
  color.yellow("SA Create End");
  return classroom;
}
