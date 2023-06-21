import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { InferedCreateClassroomFormSchema } from "@/components/form/CreateClassForm";
import { EditProfileFormSchema } from "@/components/home/dashboard/EditProfile";

const user = {
  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [id]) {
    await membersOnly();
    const data = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return res.json(data);
  },

  // ✅ Idempotent // ❌ Untested
  async getClassrooms(_, res, [id]) {
    await membersOnly();
    const data = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        memberClasses: {
          where: {
            inactive: false,
          },
          include: {
            classroom: true,
          },
        },
      },
    });
    return res.json(data.memberClasses);
  },

  // ✅ Idempotent // ❌ Untested
  async updateUser(_, res, [id], body: EditProfileFormSchema) {
    await membersOnly();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
      },
    });
    return res.json(updatedUser);
  },

  // ✅ Idempotent // ❌ Untested
  async deleteUser(_, res, [id]) {
    await membersOnly();
    const removedUser = await prisma.user.delete({
      where: { id },
    });
    return res.json(removedUser);
  },

  // ✅ Idempotent // ❌ Untested
  async joinClassroom(_, res, [uid, cid]) {
    await membersOnly();
    try {
      const data = await prisma.user.findMany({
        where: {
          id: uid,
          memberClasses: {
            some: {
              classroom: {
                inviteID: cid,
              },
              inactive: false,
            },
          },
        },
      });
      if (data.length !== 0) throw "AlreadyJoined";

      const classroom = await prisma.classroom.findUniqueOrThrow({
        where: { inviteID: cid },
      });

      await prisma.member.upsert({
        where: {
          userId_classroomId: {
            userId: uid,
            classroomId: classroom.id,
          },
        },
        update: {
          inactive: false,
        },
        create: {
          classroom: { connect: { id: classroom.id } },
          user: { connect: { id: uid } },
        },
      });

      return res.json(classroom);
    } catch (error: any) {
      if (error === "AlreadyJoined") {
        const classroom = await prisma.classroom.findUniqueOrThrow({
          where: { inviteID: cid },
        });
        return res.json(classroom);
      } else throw error;
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
    await membersOnly();
    try {
      const member = await prisma.member.findFirst({
        where: {
          userId: uid,
          classroomId: cid,
        },
        select: {
          id: true,
        },
      });
      if (!member) throw "NotJoined";

      await prisma.member.updateMany({
        where: { userId: uid, classroomId: cid },
        data: {
          inactive: true,
        },
      });

      const classroom = await prisma.classroom.findUniqueOrThrow({
        where: { id: cid },
      });
      return res.json(classroom);
    } catch (error: any) {
      if (error === "NotJoined") {
        const classroom = await prisma.classroom.findUniqueOrThrow({
          where: { id: cid },
        });
        return res.json(classroom);
      }
      throw error;
    }
  },
} satisfies HandlerLookup;

export const userRoutes = {
  "GET:/users/[userid]": user.getData,
  "DELETE:/users/[userid]": user.deleteUser,
  "PATCH:/users/[userid]": user.updateUser,
  "GET:/users/[userid]/classrooms": user.getClassrooms,
  "PUT:/users/[userid]/classrooms/[classid]": user.joinClassroom,
  // 'POST:/users/[userid]/classrooms':                 user.createClassroom,
  "DELETE:/users/[userid]/classrooms/[classid]/leave": user.leaveClassroom,
} satisfies RouteLookupType;
