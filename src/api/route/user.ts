import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";
import { ClassroomData } from "@/types/fetchmodels";
import { nanoid } from "nanoid";

export const userRoutes: RouteLookupType = {

  // Get User
  // https://www.notion.so/skripsiadekelas/Get-User-0fde89a6f40d486282ad9c190c167ce7?pvs=4
  'GET:/users/[userid]':
    async (req, res, [id]) => {
      await MustBeAuthenticated()
      const data = await prisma.user.findUnique({
        where: { id },
        include: {
          classes: { include: { categories: true } }
        }
      })
      return res.json(data)
    },
  
  // Update User
  // https://www.notion.so/skripsiadekelas/Update-User-9ad5efcb17d64492b88c0f0e267e56ab?pvs=4
  'PATCH:/users/[userid]':
    async (req, res, [userid]) => { return res.notYetImplemented() },
  
  // Get Joined Classrooms
  // https://www.notion.so/skripsiadekelas/Get-Joined-Classrooms-bf08bd8c8a0a43e4a9f0f0036c2bdf37?pvs=4
  'GET:/users/[userid]/classrooms':
    async (req, res, [userid]) => {
      await MustBeAuthenticated()
      const data = await prisma.classroom.findMany({
        where: { members: { some: { id: userid }} },
      })
      return res.json(data)
    },
  
  // Get Owned Classrooms
  // https://www.notion.so/skripsiadekelas/Get-Owned-Classrooms-cbe926fdfd5044bd896764f38ed9b7aa?pvs=4
  'GET:/users/[userid]/owned-classrooms':
    async (req, res, [userid]) => { return res.notYetImplemented() },
  
  // Join Class
  // https://www.notion.so/skripsiadekelas/Join-Class-ae0d2a35550145c69ef1f51c0afc0be8?pvs=4
  'PATCH:/users/[userid]/joinClass':
    async (req, res, [userid], data) => {
      await MustBeAuthenticated()
      const classroom: ClassroomData = await prisma.classroom.update({
        where: { id: data.classid },
        data: {
          members: { connect: { id: userid } }
        },
        include: { categories: true }
      })
      return res.json(classroom)
    },
  
  // Create a classroom
  // https://www.notion.so/skripsiadekelas/Create-Classroom-090d86a5d6644de196a2f896406ae69d?pvs=4
  'POST:/users/[userid]/classrooms':
    async (req, res, [userid]) => {
      const session = await MustBeAuthenticated()
      if (userid !== session.user.id) return res.error()
      const newClassroom = await prisma.classroom.create({
        data: {
          name: `${session.user.name}'s Classroom`,
          members: { connect: { id: `${session.user.id}` } },
          owner: { connect: { id: `${session.user.id}` } },
          inviteID: nanoid(6),
          categories: {
            create: [
              {
                name: 'Week 1',
                title: 'Untitled Category',
                sections: {
                  create: {
                    name: 'Overview',
                    order: 0
                  }
                }
              },
            ]
          },
        }
      });
      return res.json(newClassroom)
    }

}