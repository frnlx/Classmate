import { Account, Profile, Session, User, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { prisma, supabase } from "../config/dbConfig";
import { log } from "./logger";
import { authOptions } from "../config/authConfig";
import { NextResponse } from "next/server";

export async function checkIfAllowedToSignIn() {
  return true;
}

export async function afterSuccessfullSignIn(token: JWT, user: User, account: Account | null, profile?: Profile) {
  
  const { providerAccountId } = account!;
  const { name, image } = profile!;

  const userData = await prisma.user.findUnique({
    where: { 'id': user.id }
  })

  if (userData) {

    token.id = userData.id
    token.name = userData.name
    token.picture = userData.pfp
    token.sub = userData.id
    token.pfp = userData.pfp

  } else {
    // Create a new user
    await prisma.user.create({
      data: {
        id: user.id || providerAccountId, // ambil dari Google
        name: user.name || name!, // ambil dari Profile Google
        bio: '',
        pfp: user.image || image! // ambil dari Profile Google
      }
    })
  }

  log(JSON.stringify(userData,null,2))
  log(JSON.stringify(token,null,2))
  log(JSON.stringify(user,null,2))
  log(JSON.stringify(account,null,2))
  log(JSON.stringify(profile,null,2))
  token.test = "ABCD"
}

export async function jwtManuallyUpdated(token: JWT, session: Session) {

}

export async function modifySessionAfterSignIn(session: Session, token: JWT) {
  // console.log(JSON.stringify(token, null, 1))
  session.user.id = token.sub as string;
  session.user.name = token.name as string; 
}

export async function afterLogOut() {
  
}


export async function isAuth() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.id)
      return false;
    return session;
  } catch (error) {
    console.log("Error when getServerSession")
    return false;
  }
}