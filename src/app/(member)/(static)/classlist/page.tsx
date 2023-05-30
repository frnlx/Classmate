import { color } from "@/lib/logger/chalk"
import { sleepInDev } from "@/lib/util"
import { PageProps } from "@/types/next"

export default async function ClassroomListPage({ params, searchParams }: PageProps) {
  color.yellow('  ,- Classroom List Page')
  await sleepInDev(2)
  return (
    <>ClassroomList Page</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
export const dynamic = 'force-dynamic'