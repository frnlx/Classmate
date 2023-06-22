import { color } from "@/lib/logger/chalk"
import { PageProps } from "@/types/next"

export default async function TasksPage({ params, searchParams }: PageProps) {
  color.yellow('  ,- Tasks Page')

  return (
    <>Task</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page

export const dynamic = 'force-dynamic'