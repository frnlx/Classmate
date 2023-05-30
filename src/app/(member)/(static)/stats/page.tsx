import { color } from "@/lib/logger/chalk"
import { sleepInDev } from "@/lib/util"
import { PageProps } from "@/types/next"

export default async function StatisticsPage({ params, searchParams }: PageProps) {
  color.yellow('  ,- Statistics Page')
  await sleepInDev(2)

  const a = await new Promise(res => setTimeout(()=>{
    return res("Hello");
  }, 2000)) 

  return (
    <>Statistics Page {a}</>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page

export const dynamic = 'force-dynamic'
export const revalidate = 0