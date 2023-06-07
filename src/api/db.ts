import { prisma } from "@/lib/db"
import { ServerFunctionError } from "@/lib/error"
import { Category, Classroom, Resource, Section } from "@prisma/client"

export type SectionIncludeResources = Section & { post: Resource[] }


// Semi-Pure DB Methods
// NO SIDE EFFECTS
// Prisma one and only
export const db = {

  // ✅ USER
  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    })
  },
  // ✅ USER -> CLASSROOM[]
  async getUserJoinedClassroomList(id: string) {
    return await prisma.user.findUnique({
      where: { id }, include: { classes: true }
    })
  },
  // ✅ USER -> CLASSROOM[] -> [] -> CATEGORIES []
  async getUserClassroomCategories(id: string, classid: string) {
    return await prisma.user.findUnique({
      where: { id }, include: { classes: { include: { categories: { where: { classroomId: classid } } } } }
    })
  },
  // ✅ USER -> CLASSROOM[] -> [] -> CATEGORIES [] -> [] -> SECTIONS[] & RESOURCES[]
  async getUserClassroomCategoriesSectionsAndResourcse(id: string, classid: string, categories: string) {
    return await prisma.user.findUnique({
      where: { id }, include: { classes: { include: { categories: { where: { classroomId: classid }, include: { sections: { include: { post: true } } } } } } }
    })
  },


  
}