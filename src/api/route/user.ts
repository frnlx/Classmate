import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { ClassroomData } from "@/types/fetchmodels";
import { nanoid } from "nanoid";
import { db } from "../db"



const user = {

  async getData(_, res, [id]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id }
    })
    return res.json(data)
  },

  
  async getClassrooms(_, res, [id]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: { classes: true }
    })
    return res.json(data.classes)
  },

  async joinClassroom(_, res, [uid, cid]) {
    await membersOnly()
    try {
      const classroom = await prisma.$transaction(async (tx) => {
        const data = await tx.user.findUniqueOrThrow({
          where: { id: uid },
          select: { classes: { where: { id: cid } } }
        })
        if (data.classes.some(c => c.id === cid)) throw 'AlreadyJoined'
        return await tx.user.update({
          where: { id: uid },
          data: { classes: { connect: { id: cid } } }
        })
      })
      return res.json(classroom)
    } catch (error: any) {
      if (error === 'AlreadyJoined')
        return res.ok()
      else
        throw error
    }
  },

  async createClassroom(_, res, [uid, cid]) {
    return res.ok()
  }

} satisfies HandlerLookup





export const userRoutes: RouteLookupType = {
  
  'GET:/users/[userid]': user.getData,
  'GET:/users/[userid]/classrooms': user.getClassrooms,
  'PATCH:/users/[userid]/joinClass': user.joinClassroom,
  
  // Create a classroom
  // https://www.notion.so/skripsiadekelas/Create-Classroom-090d86a5d6644de196a2f896406ae69d?pvs=4
  'POST:/users/[userid]/classrooms':
    async (req, res, [userid]) => {
      const session = await membersOnly()
      if (userid !== session.user.id) throw new Error('User not found')
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