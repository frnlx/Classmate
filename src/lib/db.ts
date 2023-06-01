import { createClient } from "@supabase/supabase-js";
import { Category, Classroom, PrismaClient, Resource, Section } from "@prisma/client";

// # Unused
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
// # Unused


// Singleton Pattern
// like a static variable
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Check if static already has prisma client
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['error', 'query', 'info', 'warn'],
    log: ['error', 'info', 'warn'],
    errorFormat: 'minimal'
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export class ServerFunctionError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "ServerRenderError"
    this.stack = (<any>new Error()).stack
  }
}


export type SectionIncludeResources = Section & { post: Resource[] }

// Pure DB Methods
// Has to be PURE PURE PURE
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