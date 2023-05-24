import { RouteLookupType } from "@/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/lib/db";

export const sectionRoutes: RouteLookupType = {

  // Get Category Sections	https://notion.so/skripsiadekelas/4deb71d64df8435bb817d72db0809bd9
  'GET:/classrooms/[classid]/categories/[categoryid]/sections':
    async (req, res, [classid, categoryid]) => {
      await MustBeAuthenticated()
      const sections = await prisma.section.findMany({
        where: { categoryId: categoryid }
      })
      return res.json(sections)
    },

  // Create Section	https://notion.so/skripsiadekelas/48c756edc1784e08bdf3b4ea1ea35022
  'POST:/classrooms/[classid]/categories/[categoryid]/sections':
    async (req, res, [classid, categoryid]) => {
      await MustBeAuthenticated()
      await prisma.section.create({
        data: {
          name: 'Untitled Section',
          order: 0,
          category: { connect: { id: categoryid } }
        }
      })
      return res.ok()
    },

  // Get Section	https://notion.so/skripsiadekelas/9034f0f58ae14c9f8c4065c277b578bf
  'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]':
    async (req, res, [classid, categoryid, sectionid]) => {
      await MustBeAuthenticated();
      const section = await prisma.section.findUnique({
        where: { id: sectionid }
      })
      return res.json(section)
    },

  // Delete Section	https://notion.so/skripsiadekelas/2cff42aa237a4cc68ee23aba3b53ed0f
  'DELETE:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]':
    async (req, res, [classid, categoryid, sectionid]) => {
      await MustBeAuthenticated()
      await prisma.resource.deleteMany({
        where: { sectionId: sectionid }
      })
      const section = await prisma.section.delete({
        where: { id: sectionid },
      })
      return res.json(section)
    }
}