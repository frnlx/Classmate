import config from '@/server/config'
import { RouteParam } from '@/server/lib/client/client-helper'
import { updateUser } from '@/server/lib/models/user'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: RouteParam) {
  try {
    const userid = params['userid'] as string
    
    const session = await getServerSession(config.auth)
    if (!session) return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })
    
    const data = await request.json()

    const { error } = await updateUser(userid as string, {
      name: data.required_name,
      bio: data.bio
    });
    
    console.log(error)

    return NextResponse.json({}, { status: 200, statusText: 'OKk' })
  
  } catch (error) {
    console.log('Error occured on route user-[userid]-update')
    console.log(error)
  }
}
