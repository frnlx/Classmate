
import { color } from "@/lib/logger/chalk"
import { redirect } from "next/navigation"

export default async function ClassroomTempPage(p: { params: any }) {
  return redirect(`/${p.params.classid}/home`)
  // return <>Test</>
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page
