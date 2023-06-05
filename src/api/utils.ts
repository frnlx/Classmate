import { isAuth } from "@/lib/auth-helper";
import { redirect } from 'next/navigation'

export async function MustBeAuthenticated() {
  const session = await isAuth();
  if (!session) redirect('/auth')
  return session
}
