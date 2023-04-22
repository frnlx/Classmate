import config from '@/server/config'
import { RouteParam } from '@/server/lib/client/client-helper'
import { updateUser } from '@/server/lib/models/users'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest, { params }: RouteParam) {
  try {
    const userid = params['userid'] as string
    
    console.log(userid)

    const session = await getServerSession(config.auth)
    if (!session)
    return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })
    
    const data = await request.json()
    return NextResponse.json({}, { status: 200, statusText: 'OKk' })
  
    
    // await updateUser(userid as string, data);
    
  } catch (error) {
    
  }
}
