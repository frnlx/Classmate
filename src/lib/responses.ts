import { NextResponse } from "next/server";

export type ResponseGenerator = typeof Res;

export type ResponseTypes = Exclude<keyof typeof Res, 'json'>;

export const Res = {
  /**
   * Gives Unauthorized Response
   * @returns NextResponse of status 401
   */
  unauth:
    () => new NextResponse(undefined, { status: 401 }),
  /**
   * Gives Not Authenticated Response
   * @returns NextResponse of status 403
   */
  notAuth:
    () => new NextResponse(undefined, { status: 403 }),
  /**
   * Gives JSON Response
   * @param data 
   * @returns NextResponse of status 200
   */
  json:
    (data: any) => NextResponse.json(data, { status: 200 }),
  /**
   * Gives OK Response
   * @returns NextResponse of status 200
   */
  ok:
    () => new NextResponse(undefined, {status: 200}),
  /**
   * Gives Internal Server Error Response
   * @returns NextResponse of status 500
   */
  error:
    () => new NextResponse(undefined, { status: 500 }),
  /**
   * Gives Internal Server Error Response
   * @returns NextResponse of status 500
   */
  notYetImplemented:
    () => new NextResponse(undefined, { status: 501 }),
  /**
   * Gives Not Found Response
   * @returns NextResponse of status 404
   */
  notFound:
    () => new NextResponse(undefined, { status: 404 }),
};