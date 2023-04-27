import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'
import { HttpStatusCode } from 'axios'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest, { params }: RouteParam) {
  try {
    const session = await getServerSession(config.auth)
    if (!session)
      return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })

    await prisma.classroom.create({
      data: {
        name: `${session.user.name}'s Classroom`,
        members: {
          connect: {
            id: `${session.user.id}`
          }
        },
        owner: {
          connect: {
            id: `${session.user.id}`
          }
        },
        inviteID: nanoid(6)
      }
    })
    
    
    return NextResponse.json({ status: 200, statusText: 'OKk' })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
