import { Account, DefaultUser, Profile, Session } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";
import { prisma } from "../../lib/db";

export async function udpateJWTfromOAuth(
  defaultToken: DefaultJWT,
  extractedUser: DefaultUser,
  oAuthAccount: Account | null,
  oAuthProfile: Profile | undefined,
  ):Promise<JWT> {
  // Find user in the database
  const userData = await prisma
    .user
    .findUnique({ where: { id: extractedUser.id } });
  
  // If found use that entry to generate a token payload
  if (userData) {
    return {
      sub: userData.id,
      picture: userData.pfp,
      name: userData.name,
      email: defaultToken.email,
    }

  // If not found, create a new entry in the database
  } else {
    const defaultname = extractedUser.name || oAuthProfile?.name || 'Unnamed User'
    const defaultpfp = extractedUser.image || oAuthProfile?.image || ''

    await prisma.user.create({
      data: {
        id: extractedUser.id,
        name: defaultname,
        pfp: defaultpfp,
      }
    })

    return {
      sub: extractedUser.id,
      name: defaultname,
      pfp: defaultpfp,
      email: extractedUser.email
    }
  }
}

export async function updateJWTfromSessionUpdate(
  existingToken: JWT,
  newSession: Session | any,
) {
  console.warn('Session Update: Not Yet Implemented\n - returning existing token\n - token not updated')
  const userData = await prisma
    .user
    .findUniqueOrThrow({ where: { id: existingToken.sub } });
  return {
    sub: userData.id,
    picture: userData.pfp,
    name: userData.name,
    email: existingToken.email,
  }
}

export async function checkJWT(
  existingToken: JWT,
) {
  return existingToken
}