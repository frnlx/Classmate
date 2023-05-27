import { SignOutButton } from "@/component/use-client/Auth";
import { color } from "@/lib/logger/chalk";
import { PageProps } from "@/types/next";

export default async function DashboardPage ({ params, searchParams }: PageProps) {
  color.yellow('  ,- Dasboard Page')
  return (
    <div>
      <h1>This is Me Screen</h1>
      <p>This is Me Screen, for debug only.</p>
      <hr className="border-slate-600 my-4" />
      <h3>Search for Class</h3>
      <SignOutButton />
    </div>
  );
}

export const dynamic = 'force-dynamic'