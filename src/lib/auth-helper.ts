import { getServerSession } from "next-auth";
import { authOptions } from "../configs/auth";
import { redirect } from 'next/navigation'
import { color } from "./logger/chalk";

export async function getUserId() {
  return (await getLoggedInSession_redirectIfNotAuth()).user.id
}

export async function getLoggedInSession_redirectIfNotAuth() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth')
  return session
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