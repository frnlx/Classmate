import { NextRequest } from "next/server";

declare module 'nextutil' {
  type NextMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS" 
  
  type LayoutProps = {
    children: React.ReactNode,
    params?: { [key: string]: string | string[] },
  }

  type RootLayoutProps = {
    children: React.ReactNode,
  }

  type PageProps = {
    params?: { [key: string]: string | string[] },
    searchParams?: { [key: string]: string | string[] | undefined }
  }
  
  type ErrorProps = {
    error: Error,
    reset: () => void,
  }

  type RouteProps = {
    request: NextRequest,
    context: { [key: string]: string | string[] }
  }

  
}

