import config from "@/server/config"
import { prisma } from "@/server/config/dbConfig"
import { isAuth } from "@/server/lib/auth"
import { Res } from "@/server/lib/responses"
import { routeHandler, routes } from "@/server/lib/route"
import { UserData } from "@/server/types/fetchmodels"
import { nanoid } from "nanoid"
import { Session, getServerSession } from "next-auth"

routes({
  'GET:/test': 
    async () => {
      return Res.json({ok: 'ok'})
    },
  
  'GET:/user/[userid]':
    async (req, [id]) => {
      if (!await isAuth()) return Res.notAuth()
    
      const data: UserData | null = await prisma.user.findUnique({
        where: { id },
        include: {
          classes: {
            include: {
              categories: true
            }
          }
        }
      })
      
      return Res.json(data)
    },
  
  'POST:/user/[userid]/joinClass':
    async (req, [userid], data) => {
      if (!await isAuth()) return Res.notAuth()
      
      await prisma.user.update({
        where: { id: userid },
        data: {
          classes: {
            connect: {
              id: data.classId
            }
          }
        }
      })

      return Res.ok()
    },

  'POST:/user/[userid]/update':
    async (req, [userid], data) => {
      if (!await isAuth()) return Res.notAuth()
      
      await prisma.user.update({
        where: { id: userid },
        data: {
          name: data.required_name,
          bio: data.bio
        }
      })
      return Res.ok()
    },
});

routes({
  'GET:/classroom/[classid]':
    async (req, [id]) => {
      if (!await isAuth()) return Res.notAuth()

      const classData = await prisma.classroom.findUnique({
        where: { id },
        include: {
          members: true
        }
      })

      return Res.json(classData)
    },
  
  'POST:/classroom/[classid]/createCategory':
    async (req, [id]) => {
      if (!await isAuth()) return Res.notAuth()
      await prisma.category.create({
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
      return Res.ok()
    },
  // The dynamid route must come first.
  'POST:/classroom/create':
    async (req, params, data) => {
      if (!await isAuth()) return Res.notAuth()

      const session = await getServerSession(config.auth) as Session

      await prisma.classroom.create({
        data: {
          name: `${session.user.name}'s Classroom`,
          members: { connect: { id: `${session.user.id}` } },
          owner: { connect: { id: `${session.user.id}` } },
          inviteID: nanoid(6),
          categories: {
            create: [
              {
                name: 'Week 1',
                title: 'Untitled Category',
                sections: {
                  create: {
                    name: 'Overview',
                    order: 0
                  }
                }
              },
            ]
          },
        }
      });

      return Res.ok()
    },
})

routes({
  'GET:/category/[categoryid]':
    async (req, [id]) => {
      if (!await isAuth()) return Res.notAuth()

      const data = await prisma.category.findUnique({
        where: { id },
        include: {
          sections: {
            include: {
              post: true
            }
          }
        }
      })

      return Res.json(data)
    },
  'POST:/category/[categoryid]/createSection':
    async (req, [id]) => {
      if (!await isAuth()) return Res.notAuth()

      const data = await prisma.section.create({
        data: {
          name: 'Untitled Section',
          order: 0,
          category: { connect: { id } }
        }
      })

      return Res.ok()
    }
})

routes({
  'POST:/section/[sectionid]/createResource':
    async (req, [id], data) => {
      if (!await isAuth()) return Res.notAuth()
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
      return Res.ok()
    }
})

export {
  routeHandler as GET,
  routeHandler as POST,
  routeHandler as PUT,
  routeHandler as PATCH,
  routeHandler as DELETE,
  routeHandler as HEAD,
  routeHandler as OPTIONS,
}