import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'
import { HttpStatusCode } from 'axios'

export async function GET(request: NextRequest, { params }: RouteParam) {
  try {

    const userid = params['userid'] as string

    const session = await getServerSession(config.auth)
    if (!session || !session.user.id)
      return NextResponse.json({}, { status: 401, statusText: 'Unauthorized' })

    const userData = await prisma.user.findUnique({
      where: { id: userid },
      include: {
        classes: true,
      }
    })

    return NextResponse.json(userData, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
