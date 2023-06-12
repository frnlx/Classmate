import { color } from "@/lib/logger/chalk"
import { PageProps } from "@/types/next"

export default async function ClassroomListPage({ params, searchParams }: PageProps) {
  color.yellow('  ,- Classroom List Page')
  return (
    <>ClassroomList Page</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
export const dynamic = 'force-dynamic'