import { color } from "@/lib/logger/chalk"
import { sleepInDev } from "@/lib/util"
import { PageProps } from "@/types/next"

export default async function TasksPage({ params, searchParams }: PageProps) {
  color.yellow('  ,- Tasks Page')
  await sleepInDev(2)

  return (
    <>Task</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page

export const dynamic = 'force-dynamic'