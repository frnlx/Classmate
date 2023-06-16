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
  async getResources(_, res, [uid, cid, catid]) {
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
                Resource: true
              }
            }
          }
        }
      }
    })
    return res.json(data.classes[0].categories[0].Resource) 
  },


  async deleteCategory(_, res, [uid, cid, catid]) {
  
    return res.json({})
  }

} satisfies HandlerLookup

export const categoryRoutes: RouteLookupType = {

     'GET:/users/[userid]/classrooms/[classid]/categories/[catid]': category.getData,
  'DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]': category.deleteCategory,
     'GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources': category.getResources,


}