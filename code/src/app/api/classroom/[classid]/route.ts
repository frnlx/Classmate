import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'
import { HttpStatusCode } from 'axios'

export async function GET(request: NextRequest, { params }: RouteParam) {
  try {

    const classId = params['classid'] as string

    const session = await getServerSession(config.auth)
    if (!session || !session.user.id)
      return NextResponse.json({}, { status: 401, statusText: 'Unauthorized' })

    const classData = await prisma.classroom.findUnique({
      where: { id: classId },
      include: {
        members: true
      }
    })

    return NextResponse.json(classData, { status: 200, statusText: 'OKk' })

  } catch (error) { 
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
