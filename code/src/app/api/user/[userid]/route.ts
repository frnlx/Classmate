import config from '@/server/config'
import { RouteParam } from '@/component/lib/client-helper'
import { getServerSession } from 'next-auth'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/server/config/dbConfig'
import { HttpStatusCode } from 'axios'
import { isAuthenticated } from '@/server/lib/auth'
import { AppResponse } from '@/server/lib/responses'
import { logError } from '@/server/lib/route'



export async function GET(request: NextRequest, { params }: RouteParam) {

  const userid = params['userid']

  if (await isAuthenticated())
    return AppResponse.notAuthenticated()
  
  logError(async () => {
    
    const userData = await fetchUser(userid)
    return AppResponse.ok(userData)

  })
}

const fetchUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { classes: true, }
  })
}
