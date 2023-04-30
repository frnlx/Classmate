import { NextResponse } from "next/server";
import { isAuthenticated } from "./auth";
import { Res } from "./responses";



export async function authenticate() {
  if (await isAuthenticated())
    return Res.notAuth()
}



export const mustBeAuthenticated = async (next: ()=>NextResponse) => {
  if (await isAuthenticated())
    return Res.notAuth()
  const res = await next();
  return res;
}

export const logError = (next: () => any) => {
    try {
      return next()
    } catch (error) {
      console.log(error)
      return Res.error(error)
    }
}
