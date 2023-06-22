import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { CategoryFormSchema } from "@/app/(member)/[classid]/-Sidebar/CategoryForm";

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
                      orderBy: { createdAt: "desc" },
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
    await prisma.category.delete({
      where: { id: catid },
    });
    return res.json({});
  },

  async updateCategory(_, res, [uid, cid, catid], body: CategoryFormSchema) {
    await prisma.category.update({
      where: { id: catid },
      data: {
        title: body.name,
      },
    });
    return res.ok();
  },
} satisfies HandlerLookup;

export const categoryRoutes = {
  "GET:/users/[userid]/classrooms/[classid]/categories/[catid]":
    category.getData,
  "DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]":
    category.deleteCategory,
  "GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources":
    category.getResources,
  "PATCH:/users/[userid]/classrooms/[classid]/categories/[catid]":
    category.updateCategory,
} satisfies RouteLookupType;
