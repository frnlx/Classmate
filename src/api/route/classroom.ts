import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation"
import { notAuthorized } from "../responses"

const classroom = {

  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [uid, cid]) {
    await membersOnly()
    const data = await prisma.classroom.findFirst({
      where: {
        id: cid,
        members: {
          some: {
            id: uid
          }
        }
      },
    })
    if (!data) notAuthorized()

    return res.json(data)
  },

  // ✅ Idempotent // ❌ Untested
  async getCategories(_, res, [uid, cid]) {
    await membersOnly()
    const data = await prisma.classroom.findFirst({
      where: {
        id: cid,
        members: {
          some: {
            id: uid
          }
        }
      },
      select: {
        categories: true
      }
    })
    console.log("HELLO????")
    if (!data) notAuthorized()

    return res.json(data.categories)
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