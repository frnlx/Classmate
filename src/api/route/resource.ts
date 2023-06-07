import { RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";

export const resourceRoutes: RouteLookupType = {

  // Get Section Resources	https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources':
    async (req, res, [classid, categoryid, sectionid]) => {
      await membersOnly()
      const resources = await prisma.resource.findMany({
        where: { sectionId: sectionid }
      })
      return res.json(resources)
    },

  // Create Resource	https://notion.so/skripsiadekelas/a8f870526a074612b4f96e812bb3a67b
  'POST:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources':
    async (req, res,[classid, categoryid, sectionid], data) => {
      await membersOnly()
      console.log('Hello')
      const newResource = await prisma.resource.create({
        data: {
          title: data.title,
          content: data.content,
          order: 0,
          Section: { connect: { id: sectionid } }
        }
      })
      return res.json(newResource)
    },

  // Get Resource	https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]':
    async (req, res, [classid, categoryid, sectionid, resourceid]) => {
      await membersOnly()
      const resource = await prisma.resource.findUnique({
        where: { id: resourceid }
      })
      return res.json(resource)
    },
  
  // Delete Resource	https://notion.so/skripsiadekelas/707c29316b2d45459c6220ed527c3655
  'DELETE:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]':
    async (req, res, [classid, categoryid, sectionid, resourceid]) => {
      await membersOnly()
      const deletedResource = await prisma.resource.delete({
        where: { id: resourceid }
      })
      return res.json(deletedResource)
    },
} 