import { NextRequest } from "next/server";

export type LayoutProps = {
  children: React.ReactNode,
  params?: { [key: string]: string | string[] },
}

export type RootLayoutProps = {
  children: React.ReactNode,
}

export type PageProps = {
  params?: { [key: string]: string | string[] },
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type ErrorProps = {
  error: Error,
  reset: () => void,
}

export type RouteProps = {
  request: NextRequest,
  context: { [key: string]: string | string[] }
}