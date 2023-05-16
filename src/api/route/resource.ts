import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";
import { nanoid } from "nanoid";

export const resourceRoutes: RouteLookupType = {

  // Get Section Resources	https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources':
    async (req, res, [classid, categoryid, sectionid]) => {
      return res.notYetImplemented()
    },

  // Create Resource	https://notion.so/skripsiadekelas/a8f870526a074612b4f96e812bb3a67b
  'POST:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources':
    async (req, res,[classid, categoryid, sectionid], data) => {
      MustBeAuthenticated()
      await prisma.resource.create({
        data: {
          title: data.title,
          content: data.content,
          order: 0,
          Section: { connect: { id: sectionid } }
        }
      })
      return res.ok()
    },

  // Get Resource	https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]':
    async (req, res) => {
      return res.notYetImplemented()
    },
  
  // Delete Resource	https://notion.so/skripsiadekelas/707c29316b2d45459c6220ed527c3655
  'DELETE:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]':
    async (req, res) => {
      return res.notYetImplemented()
    },
} 