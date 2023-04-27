import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'

export async function POST(request: NextRequest, { params }: RouteParam) {
  try {
    const userid = params['userid'] as string
    
    const session = await getServerSession(config.auth)
    if (!session) return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })
    
    const data = await request.json()

    await prisma.user.update({
      where: { id: userid },
      data: {
        name: data.required_name,
        bio: data.bio
      }
    })
    
    return NextResponse.json({}, { status: 200, statusText: 'OKk' })
  
  } catch (error) {
    console.log(error)
    return NextResponse.json(error, { status: 500 })
  }
}
