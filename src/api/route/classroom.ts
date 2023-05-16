import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";
import { nanoid } from "nanoid";

export const classroomRoutes: RouteLookupType = {

  // Get Class
  // https://www.notion.so/skripsiadekelas/Get-Class-5c9abfbdf06948728a6127e6d5327954?pvs=4
  'GET:/classrooms/[classid]':
    async (req, res, [id]) => {
      await MustBeAuthenticated()
      const classData = await prisma.classroom.findUnique({
        where: { id },
        include: {
          members: true
        }
      })
      return res.json(classData)
    },
  
  // Get Class Invites
  // https://www.notion.so/skripsiadekelas/Get-Class-Invites-3e2e953194d0482daa188994bba654b3?pvs=4
  'GET:/classrooms/[classid]/invites': async (req, res) => { return res.notYetImplemented() },

  // Create Class Invite
  // https://www.notion.so/skripsiadekelas/Create-Class-Invite-61d9d1c320f14f6596532fcdbe815aa2?pvs=4
  'POST:/classrooms/[classid]/invites': async (req, res) => { return res.notYetImplemented() },



}