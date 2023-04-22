import config from "@/server/config";
import NextAuth from "next-auth/next";

const handler = NextAuth(config.auth) 
export { handler as GET, handler as POST }