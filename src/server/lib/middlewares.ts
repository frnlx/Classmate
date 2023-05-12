import { NextResponse } from "next/server";
import { isAuth } from "./auth";
import { Res } from "./responses";



export async function authenticate() {
  if (await isAuth())
    return Res.notAuth()
}

export const mustBeAuthenticated = async (next: ()=>NextResponse) => {
  if (await isAuth())
    return Res.notAuth()
  const res = await next();
  return res;
}

export const logError = (next: () => any) => {
    try {
      return next()
    } catch (error) {
      console.log(error)
      return Res.error()
    }
}
