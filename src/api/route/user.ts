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
        select: { classes: { where: { inviteID: cid } } }
      })
      if (data.classes[0]) throw 'AlreadyJoined'

      await prisma.user.update({
        where: { id: uid },
        data: { classes: { connect: { inviteID: cid } } }
      })

      const classroom = await prisma.classroom.findUniqueOrThrow({
        where: { inviteID: cid }
      })
      return res.json(classroom)

    } catch (error: any) {
      if (error === 'AlreadyJoined')
        return res.ok()
      else
        throw error
    }
  },

  // // ❌ Non-Idempotent // ❌ Untested
  // async createClassroom(_, res, [uid, cid], body: InferedCreateClassroomFormSchema) {

  //   throw new Error('Not allowed to create classroom using API handler. Use server action instead')

  //   const session = await membersOnly()
  //   if (uid !== session.user.id) throw new Error('User not found')

  //   const newClasroom = await prisma.classroom.create({
  //     data: {
  //       name: body.name,
  //       // FIXME: This is not correct
  //       description: "",
  //       members: {
  //         connect: { id: uid } // will throw if not found
  //       },
  //       owner: {
  //         connect: { id: uid } // will throw if not found
  //       },
  //       inviteID: nanoid(6),
  //       categories: {
  //         create: [
  //           {
  //             name: 'Overview',
  //             title: 'My First Topic',
  //             sections: {
  //               create: [
  //                 {
  //                   name: 'Introduction',
  //                   order: 0
  //                 }
  //               ]
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   })

  //   return res.json(newClasroom)
  // },

  // ❌ Non-Idempotent // ❌ Untested
  async leaveClassroom(_, res, [uid, cid]) {
    await membersOnly()
    try {
      
      const data = await prisma.user.findUniqueOrThrow({
        where: { id: uid },
        select: { classes: { where: { id: cid } } }
      })
      if (!data.classes[0]) throw 'NotJoined'

      await prisma.user.update({
        where: { id: uid },
        data: { classes: { disconnect: { id: cid } } }
      })

      const classroom = await prisma.classroom.findUniqueOrThrow({
        where: {id: cid}
      })
      return res.json(classroom)
    } catch (error: any) {
      if (error === 'NotJoined')
        return res.ok()
      else
        throw error
    }
  },

} satisfies HandlerLookup





export const userRoutes: RouteLookupType = {
     'GET:/users/[userid]':                            user.getData,
     'GET:/users/[userid]/classrooms':                 user.getClassrooms,
     'PUT:/users/[userid]/classrooms/[classid]':       user.joinClassroom,
    // 'POST:/users/[userid]/classrooms':                 user.createClassroom,
  'DELETE:/users/[userid]/classrooms/[classid]/leave': user.leaveClassroom

}