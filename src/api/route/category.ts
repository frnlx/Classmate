import { RouteLookupType } from "@/lib/route";
import { MustBeAuthenticated } from "../utils";
import { prisma } from "@/lib/db";

export const categoryRoutes: RouteLookupType = {
  
  // Get Class Categories
  // https://www.notion.so/skripsiadekelas/Get-Class-Categories-df2bc14815614458b6875a695237f5eb?pvs=4
  'GET:/classrooms/[classid]/categories': async (req, res, [id]) => {
    await MustBeAuthenticated()
    const categories = await prisma.category.findMany({
      where: { classroomId: id }
    })
    return res.json(categories)
  },

  // Create Category
  // https://www.notion.so/skripsiadekelas/Create-Category-430315c8671c4569b6e3ca941a9494c5?pvs=4
  'POST:/classrooms/[classid]/categories': async (req, res, [id]) => { 
    await MustBeAuthenticated()
    const newCategory = await prisma.category.create({
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
    return res.json(newCategory)
  },
  
  // Get Category
  // https://www.notion.so/skripsiadekelas/Get-Category-21f5c88d01b94bc089bd2d632da5c70f?pvs=4
  'GET:/classrooms/[classid]/categories/[categoryid]': async (req, res, [classid, categoryid]) => {
    await MustBeAuthenticated()
    const category = await prisma.category.findUnique({
      where: { id: categoryid },
      include: {
        sections: { include: { post: true } }
      }
    })
    return res.json(category)
  },

  // Delete Category
  // https://www.notion.so/skripsiadekelas/Delete-Category-ee287838e9b94ee9ae79acb249172aa1?pvs=4
  'DELETE:/classrooms/[classid]/categories/[categoryid]': async (req, res, [classid, categoryid]) => { 
    await MustBeAuthenticated()
    const deletedCategory = await prisma.category.delete({
      where: { id: categoryid },
    })
    return res.json(deletedCategory)
   },




}