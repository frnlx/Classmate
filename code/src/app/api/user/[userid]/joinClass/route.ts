import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'

export async function POST(request: NextRequest, { params }: RouteParam) {
  try {
    console.log("Hi")
    const userid = params['userid'] as string

    const session = await getServerSession(config.auth)
    if (!session) return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })

    const data = await request.json()
    console.log("Hi")

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

    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
