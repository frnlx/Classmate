import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";

const category = {

  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [uid, cid, catid ]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid },
          select: {
            categories: {
              where: { id: catid }
            }
          }
        }
      }
    })
    return res.json(data.classes[0].categories[0])
  },


  // ✅ Idempotent // ❌ Untested
  async getSections(_, res, [uid, cid, catid]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      include: {
        classes: {
          where: { id: cid },
          include: {
            categories: {
              where: { id: catid },
              include: {
                sections: true
              }
            }
          }
        }
      }
    })
    return res.json(data.classes[0].categories[0].sections) 
  },

  // ❌ Non-Idempotent // ❌ Untested
  async createSections(_, res, [uid, cid, catid]) {
    await membersOnly()

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid },
          select: { categories: { where: { id: catid } } }
        }
      }
    })
    if (!data.classes[0])
      throw new Error('Unauthorized | User is not part of the class to create sections')
    if (!data.classes[0].categories[0])
      throw new Error('Unauthorized | ')

    return res.json({})
  },

  async deleteCategory(_, res, [uid, cid, catid]) {
    
    return res.json({})
  }

} satisfies HandlerLookup

export const categoryRoutes: RouteLookupType = {

     'GET:/users/[userid]/classrooms/[classid]/categories/[catid]': category.getData,
  'DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]': category.deleteCategory,
     'GET:/users/[userid]/classrooms/[classid]/categories/[catid]/sections': category.getSections,
    'POST:/users/[userid]/classrooms/[classid]/categories/[catid]/sections': category.createSections,


}