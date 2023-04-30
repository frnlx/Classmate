import config from "@/server/config"
import { prisma } from "@/server/config/dbConfig"
import { isAuthenticated as isAuth } from "@/server/lib/auth"
import { Res } from "@/server/lib/responses"
import { routeHandler, routes } from "@/server/lib/route"
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
    
      const data = await prisma.user.findUnique({
        where: { id },
        include: {
          classes: true
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
  
  'POST:/classroom/create':
    async (req, params, data) => {
      if (!await isAuth()) return Res.notAuth()

      console.log("B")

      const session = await getServerSession(config.auth) as Session

      console.log("C")

      await prisma.classroom.create({
        data: {
          name: `${session.user.name}'s Classroom`,
          members: { connect: { id: `${session.user.id}` } },
          owner: { connect: { id: `${session.user.id}` } },
          inviteID: nanoid(6),
          categories: {
            create: [
              { name: 'Week 1', title: 'Untitled Category' },
              { name: 'Week 2', title: 'Untitled Category' }
            ]
          },
        }
      });

      console.log("A")

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