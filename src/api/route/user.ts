import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { InferedCreateClassroomFormSchema } from "@/components/form/CreateClassForm"


const user = {

  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [id]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id }
    })
    return res.json(data)
  },

  // ✅ Idempotent // ❌ Untested
  async getClassrooms(_, res, [id]) {
    await membersOnly()
    const data = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: { classes: true }
    })
    return res.json(data.classes)
  },

  // ✅ Idempotent // ❌ Untested
  async joinClassroom(_, res, [uid, cid]) {
    await membersOnly()
    try {

      const data = await prisma.user.findUniqueOrThrow({
        where: { id: uid },
        select: { classes: { where: { id: cid } } }
      })
      if (data.classes[0]) throw 'AlreadyJoined'

      const classroom = await prisma.user.update({
        where: { id: uid },
        data: { classes: { connect: { id: cid } } }
      })
      return res.json(classroom)

    } catch (error: any) {
      if (error === 'AlreadyJoined')
        return res.ok()
      else
        throw error
    }
  },

  // ❌ Non-Idempotent // ❌ Untested
  async createClassroom(_, res, [uid, cid], body: InferedCreateClassroomFormSchema) {

    const session = await membersOnly()
    if (uid !== session.user.id) throw new Error('User not found')

    const newClasroom = await prisma.classroom.create({
      data: {
        name: body.name,
        // FIXME: This is not correct
        description: "",
        members: {
          connect: { id: uid } // will throw if not found
        },
        owner: {
          connect: { id: uid } // will throw if not found
        },
        inviteID: nanoid(6),
        categories: {
          create: [
            {
              name: 'Overview',
              title: 'My First Topic',
              sections: {
                create: [
                  {
                    name: 'Introduction',
                    order: 0
                  }
                ]
              }
            }
          ]
        }
      }
    })

    return res.json(newClasroom)
  }

} satisfies HandlerLookup





export const userRoutes: RouteLookupType = {

    'GET:/users/[userid]':            user.getData,
    'GET:/users/[userid]/classrooms': user.getClassrooms,
  'PATCH:/users/[userid]/classrooms/7':  user.joinClassroom,
   'POST:/users/[userid]/classrooms': user.createClassroom,

}