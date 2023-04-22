import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { supabase } from "../config/dbConfig";
import { log } from "../lib/logger";
import { createUser, findUser } from "../lib/models/users";

export async function checkIfAllowedToSignIn() {
  return true;
}

export async function afterSuccessfullSignIn(token: JWT, user: User, account: Account | null, profile?: Profile) {
  
  const { providerAccountId } = account!;
  const { name, image } = profile!;

  const userData = await findUser(user.id)
  
  if (userData) {

    token.id = userData.id
    token.name = userData.name
    token.picture = userData.pfp
    token.sub = userData.id
    token.pfp = userData.pfp

  } else {
    // Create a new user
    await createUser({
      id: user.id || providerAccountId,
      name: user.name || name!,
      bio: '',
      pfp: user.image || image!,
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
  session.user.id = token.id as string;
  session.user.name = token.name as string; 
}

export async function afterLogOut() {
  
}