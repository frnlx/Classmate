import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";

export const userRoutes: RouteLookupType = {
  'GET:/user/[userid]': 
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
  
  'POST:/user/[userid]/joinClass':
    async (req, res, [userid], data) => {
      await MustBeAuthenticated()
      await prisma.user.update({
        where: { id: userid },
        data: {
          classes: { connect: { id: data.classId } }
        }
      })
      return res.ok()
    },
  
  'POST:/user/[userid]/update':
    async (req, res, [id], data) => {
      await MustBeAuthenticated()
      await prisma.user.update({
        where: { id },
        data: {
          name: data.required_name,
          bio: data.bio
        }
      })
      return res.ok()
    }
}