import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";

const category = {
  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [uid, cid, catid]) {
    await membersOnly();
    const data = await prisma.category.findUniqueOrThrow({
      where: { id: catid },
    });
    return res.json(data);
  },

  // ✅ Idempotent // ❌ Untested
  async getResources(_, res, [uid, cid, catid]) {
    await membersOnly();
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      include: {
        memberClasses: {
          where: { classroomId: cid },
          include: {
            classroom: {
              include: {
                categories: {
                  where: { id: catid },
                  include: {
                    Resource: {
                      include: {
                        Assignment: true,
                        Discussion: true,
                        _count: {
                          select: { Comment: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.json(data.memberClasses[0].classroom.categories[0].Resource);
  },

  async deleteCategory(_, res, [uid, cid, catid]) {
    return res.json({});
  },
} satisfies HandlerLookup;

export const categoryRoutes = {
  "GET:/users/[userid]/classrooms/[classid]/categories/[catid]":
    category.getData,
  "DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]":
    category.deleteCategory,
  "GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources":
    category.getResources,
} satisfies RouteLookupType;
