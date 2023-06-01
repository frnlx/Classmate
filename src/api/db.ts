import { prisma } from "@/lib/db"
import { ServerFunctionError } from "@/lib/error"
import { Category, Classroom, Resource, Section } from "@prisma/client"

export type SectionIncludeResources = Section & { post: Resource[] }

// Semi-Pure DB Methods
// NO SIDE EFFECTS
// throw by default - need to be trycatched
export const db = {

  getUser: async (id: string) => {
    const data = await prisma.user.findUnique({ where: { id } })
    if (!data) throw new ServerFunctionError('User Not Found')
    return data
  },
  getUserJoinedClassroom: async (id: string) => {
    const data = await prisma.user.findUnique({ where: { id }, select: { classes: true } })
    if (!data) throw new ServerFunctionError('User Not Found')
    const map = new Map<string, Classroom>()
    data.classes.forEach(ujc => map.set(ujc.id, ujc))
    return map
  },
  getClassroomCategories: async (id: string) => {
    const data = await prisma.classroom.findUnique({ where: { id }, select: { categories: true } })
    if (!data) throw new ServerFunctionError('Classroom Not Found')
    const map = new Map<string, Category>()

    data.categories.forEach(cc => map.set(cc.id, cc))
    return map
  },
  getCategorySectionsAndResources: async (id: string) => {
    const data = await prisma.category.findUnique({ where: { id }, select: { sections: { include: { post: true } } } })
    if (!data) throw new ServerFunctionError('Category Not Found')
    const map = new Map<string, SectionIncludeResources>()
    const resourcemap = new Map<string, Resource>
    data.sections.forEach(csr => {
      map.set(csr.id, csr)
      csr.post.forEach(p => resourcemap.set(p.id, p))
    })
    return { map, resourcemap }
  }

}