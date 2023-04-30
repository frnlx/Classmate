import { NextResponse } from "next/server";

export const AppResponse = {
  unauthorized:
    (data?: any) =>
      NextResponse.json(data, { status: 401 }),
  notAuthenticated:
    (data?: any) =>
      NextResponse.json(data, { status: 403 }),
  ok:
    (data?: any) =>
      NextResponse.json(data, { status: 200 }),
  error:
    (data?: any) => 
      NextResponse.json(data, { status: 500 })
}