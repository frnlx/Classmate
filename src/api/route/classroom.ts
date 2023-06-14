import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";

const classroom = {

  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [uid, cid]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid }
        }
      }
    })

    return res.json(data.classes[0])
  },

  // ✅ Idempotent // ❌ Untested
  async getCategories(_, res, [uid, cid]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: {
            id: cid
          },
          select: {
            categories: true
          }
        }
      }
    })

    return res.json(data.classes[0].categories)
  },

  // ❌ Non-Idempotent // ❌ Untested
  async createCategory(_, res, [uid, cid], body) {
    await membersOnly()

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: { classes: { where: { id: cid } } }
    })
    if (!data.classes[0]) throw new Error('Unauthorized | User is not part of the class')

    const newCategory = await prisma.category.create({
      data: {
        name: 'New Category',
        title: 'Untitled Category',
        classroom: {
          connect: { id: cid }
        },
        sections: {
          create: {
            name: 'Overview',
            order: 0
          }
        }
      },
    })
    return res.json(newCategory)

  }

} satisfies HandlerLookup


export const classroomRoutes: RouteLookupType = {

   'GET:/users/[userid]/classrooms/[classid]':            classroom.getData,
   'GET:/users/[userid]/classrooms/[classid]/categories': classroom.getCategories,
  'POST:/users/[userid]/classrooms/[classid]/categories': classroom.createCategory,


}