import config from '@/server/config'
import { RouteParam } from '@/server/lib/client/client-helper'
import { findUser, updateUser } from '@/server/lib/models/user'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: RouteParam) {
  try {
    const userid = params['userid'] as string
    const session = await getServerSession(config.auth)
    
    if (!session)
      return NextResponse.json({}, { status: 401, statusText: 'Unauthorizedd' })

    const userData = await findUser(userid as string);
    
    return NextResponse.json(userData, { status: 200, statusText: 'OKk' })
  } catch (error) {
    console.log(error)
  }
}
