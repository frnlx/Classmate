import { SignOutButton } from "@/components/use-client/Auth"
import { color } from "@/lib/logger/chalk";
import { sleepInDev } from "@/lib/util"
import { PageProps } from "@/types/next";

export default async function DashboardPage ({ params, searchParams }: PageProps) {
  color.yellow('  ,- Dasboard Page')
  await sleepInDev(2)
  const rand = Math.random()

  return (
    <div>
      <h1>This is Me Screen</h1>
      <p>This is Me Screen, for debug only.</p>
      <hr className="border-slate-600 my-4" />
      <h3>Search for Class</h3>
      <p>{ rand }</p>
      <SignOutButton />
    </div>
  );
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0