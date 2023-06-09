import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";


const resource = {

  async getData(_, res, [uid, cid, catid, sid, rid]) {
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
                  where: { id: sid },
                  select: {
                    post: {
                      where: {
                        id: rid,
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    return res.json(data.classes[0].categories[0].sections[0].post[0])
  },



} satisfies HandlerLookup

export const resourceRoutes: RouteLookupType = {

  // Get Resource	https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]': resource.getData
  
} 