import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { ResourceFormSchema } from "@/components/classroom/category/resources/AddResource";
import { ResourceType } from "@prisma/client";


const resource = {

  async getData(_, res, [uid, cid, catid, rid]) {
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
                Resource: {
                  where: {
                    id: rid,
                  }
                }
              }
            }
          }
        }
      }
    })

    return res.json(data.classes[0].categories[0].Resource[0])
  },

  async createResource(_, res, [uid, cid, catid, rid], body: ResourceFormSchema) {
    const resource = await prisma.resource.create({
      data: {
        title: body.title,
        content: body.content,
        category: {
          connect: { id: catid }
        },
        type: body.type,
        order: 0,
      }
    })

    if (body.type === ResourceType.NORMAL_POST) {
      await prisma.normalPost.create({
        data: {
          resource: { connect: {id: resource.id} }
        }
      })
    } else if (body.type === ResourceType.ASSIGNMENT) {
      await prisma.assignment.create({
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
          resource: { connect: {id: resource.id} }
        }
      })
    } else {
      await prisma.discussion.create({
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
          resource: { connect: {id: resource.id} }
        }
      })
    }

    return res.json(resource)
  }

} satisfies HandlerLookup

export const resourceRoutes: RouteLookupType = {

  // Get Resource	https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
   'GET:/users/[userid]/classrooms/[classid]/categories/[categoryid]/resources/[resourceid]': resource.getData,
  'POST:/users/[userid]/classrooms/[classid]/categories/[categoryid]':                        resource.createResource
  
} 