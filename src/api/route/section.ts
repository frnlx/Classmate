import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client"


const section = {

  async getData(_, res, [uid, cid, catid, sectid]) {
    await membersOnly()

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid },
          select: {
            categories: {
              where: { id: catid },
              include: { 
                sections: {
                  where: { id: sectid }
                }
              }
            }
          }
        }
      }
    })

    return res.json(data.classes[0].categories[0].sections[0])
  },

  async getResources(_, res, [uid, cid, catid, sectid]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid },
          select: {
            categories: {
              where: { id: catid },
              include: {
                sections: {
                  where: { id: sectid },
                  select: {
                    post: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return res.json(data.classes[0].categories[0].sections[0].post)
  },

  async createResource(_, res, [uid, cid, catid, sectid], body: Prisma.ResourceCreateInput) {
    await membersOnly()

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        classes: {
          where: { id: cid },
          select: {
            categories: {
              where: { id: catid },
              select: {
                sections: {
                where: { id: sectid }
              }}
            }
          }
        }
      }
    })
    if (!data.classes[0])
      throw new Error('Unauthorized | User is not part of the class to create sections')
    if (!data.classes[0].categories[0])
      throw new Error('NotFound | Category is not in the classroom')
    if (!data.classes[0].categories[0].sections[0])
      throw new Error('NotFound | Section is not in the category')
    
    // const resource = await prisma.resource.create({
    //   data: {
    //     title: body.title,
    //     order: 0,
    //     content: body.content,
    //     Section: {
    //       connect: { id: sectid }
    //     }
    //   }
    // })
  
    // return res.json(resource)
    return res.json({})
  },

  async delete(_, res, [uid, cid, catid, sectid]) {


    return res.json({})
  }

} satisfies HandlerLookup

export const sectionRoutes: RouteLookupType = {

  'GET:/users/[userid]/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]': section.getData,
  'GET:/users/[userid]/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources': section.getData,
  'POST:/users/[userid]/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources': section.createResource,

}