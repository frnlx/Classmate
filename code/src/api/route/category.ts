import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";

export const categoryRoutes: RouteLookupType = {
  'GET:/category/[categoryid]':
    async (req, res, [id]) => {
      await MustBeAuthenticated()
      const data = await prisma.category.findUnique({
        where: { id },
        include: {
          sections: { include: { post: true } }
        }
      })
      return res.json(data)
    },
  
  'POST:/category/[categoryid]/createSection':
    async (req, res, [id]) => {
      await MustBeAuthenticated()
      await prisma.section.create({
        data: {
          name: 'Untitled Section',
          order: 0,
          category: { connect: { id } }
        }
      })
      return res.ok()
    },
}