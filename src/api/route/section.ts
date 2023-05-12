import { RouteLookupType } from "@/server/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/server/config/dbConfig";

export const sectionRoutes: RouteLookupType = {
  'POST:/section/[sectionid]/createResource':
    async (req, res, [id], data) => {
      MustBeAuthenticated()
      console.log(data)
      console.log(id)
      await prisma.resource.create({
        data: {
          title: data.title,
          content: data.content,
          order: 0,
          Section: { connect: { id } }
        }
      })
      return res.ok()
    }
}