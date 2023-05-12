import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";
import { nanoid } from "nanoid";

export const classroomRoutes: RouteLookupType = {
  'GET:/classroom/[classid]':
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

  'POST:/classroom/[classid]/createCategory':
    async (req, res, [id]) => {
      await MustBeAuthenticated()
      await prisma.category.create({
        data: {
          name: 'New Category',
          title: 'Untitled Category',
          classroom: {
            connect: { id }
          },
          sections: {
            create: {
              name: 'Overview',
              order: 0
            }
          }
        }
      })
      return res.ok()
    },
  // The dynamid route must come first.
  'POST:/classroom/create':
    async (req, res, params, data) => {
      const session = await MustBeAuthenticated()
      await prisma.classroom.create({
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
      return res.ok()
    },
}