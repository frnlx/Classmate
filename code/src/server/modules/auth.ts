import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { supabase } from "../config/db";
import { log } from "../lib/logger";

export async function checkIfAllowedToSignIn() {
  return true;
}

export async function afterSuccessfullSignIn(token: JWT, user: User, account: Account | null, profile?: Profile) {
  const userData = await supabase.from('users').select().eq('id', user.id)

  if (!userData) {
    await supabase.from('users').insert([
      
    ])
  }

  log(JSON.stringify(userData,null,2))
  token.test = "ABCD"
}

export async function jwtManuallyUpdated(token: JWT, session: Session) {

}

export async function modifySessionAfterSignIn(session: Session, token: JWT) {
  
}

export async function afterLogOut() {
  
}