import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { notAuthorized } from "../responses";
import { EditClassroomFormSchema } from "@/components/form/EditClassForm";

const classroom = {
  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [uid, cid]) {
    await membersOnly();
    const data = await prisma.classroom.findFirst({
      where: {
        id: cid,
        members: {
          some: {
            userId: uid,
          },
        },
      },
      include: {
        owner: true,
      },
    });
    if (!data) notAuthorized();

    return res.json(data);
  },

  // ✅ Idempotent // ❌ Untested
  async getCategories(_, res, [uid, cid]) {
    await membersOnly();
    const data = await prisma.classroom.findFirst({
      where: {
        id: cid,
        members: {
          some: {
            userId: uid,
          },
        },
      },
      select: {
        categories: true,
      },
    });
    if (!data) notAuthorized();

    return res.json(data.categories);
  },

  // ❌ Non-Idempotent // ❌ Untested
  async createCategory(_, res, [uid, cid], body) {
    await membersOnly();

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: { memberClasses: { where: { classroomId: cid } } },
    });
    if (!data.memberClasses[0])
      throw new Error("Unauthorized | User is not part of the class");

    const newCategory = await prisma.category.create({
      data: {
        title: "Untitled Category",
        classroom: {
          connect: { id: cid },
        },
      },
    });
    return res.json(newCategory);
  },

  async getMembers(_, res, [uid, cid], __) {
    await membersOnly();

    const data = await prisma.user.findFirst({
      where: { id: uid },
      select: {
        memberClasses: {
          where: {
            classroomId: cid,
          },
          include: {
            classroom: {
              select: {
                members: {
                  where: {
                    inactive: false,
                  },
                  include: {
                    user: true,
                  },
                  orderBy: {
                    createdAt: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.json(data?.memberClasses[0].classroom.members);
  },

  // ❌ Non-Idempotent // ❌ Untested
  async editClassroom(_, res, [uid, cid], body: EditClassroomFormSchema) {
    await membersOnly();
    const updated = await prisma.classroom.update({
      where: { id: cid },
      data: {
        name: body.name,
        description: body.desc,
      },
    });

    return res.json(updated);
  },

  // ❌ Non-Idempotent // ❌ Untested
  async removeClassroom(_, res, [uid, cid], __) {
    await membersOnly();
    const deleted = await prisma.classroom.delete({
      where: { id: cid },
    });

    return res.json(deleted);
  },
} satisfies HandlerLookup;

export const classroomRoutes = {
  "GET:/users/[userid]/classrooms/[classid]": classroom.getData,
  "PATCH:/users/[userid]/classrooms/[classid]": classroom.editClassroom,
  "DELETE:/users/[userid]/classrooms/[classid]": classroom.removeClassroom,
  "GET:/users/[userid]/classrooms/[classid]/members": classroom.getMembers,
  "GET:/users/[userid]/classrooms/[classid]/categories":
    classroom.getCategories,
  "POST:/users/[userid]/classrooms/[classid]/categories":
    classroom.createCategory,
} satisfies RouteLookupType;
