import { RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";

export const classroomRoutes: RouteLookupType = {

  'GET:/users/[userid]/classrooms/[classid]':
    async (req, res, [userid, classid]) => {
      await membersOnly()
      const data = await prisma.user.findUniqueOrThrow({
        where: { id: userid },
        select: {
          classes: {
            where: { id: classid }
          }
        }
      });
      console.log(data)
      return res.json(data.classes[0])
    },
}