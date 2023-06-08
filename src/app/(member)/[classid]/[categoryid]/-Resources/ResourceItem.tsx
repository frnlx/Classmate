import { useGetResource } from "@/api/client/resource"
import { useRoom } from "@/app/(member)/-Navbar/Navbar"
import { usePage } from "../../-Sidebar/Pages"
import Link from "next/link"
import clsx from "clsx"
import { Note } from "@phosphor-icons/react"
import { Route } from "next"

export default function ResourceItem(p: {
  secid: string
  id: string
}) {
  const room = useRoom()
  const page = usePage()

  const { data } = useGetResource(
    room.currentId, page.currentid, p.secid, p.id,
  )

  return (
    <Link href={`/${p.id}`}>
      <div className={clsx(
        "px-2 py-3 flex flex-row items-center gap-2 rounded-md",
        "hover:text-slate-300 hover:bg-slate-700/25"
      )}>
        <div className="p-2 rounded-xl bg-slate-700">
          <Note className="text-2xl" />
        </div>
        <div>
          <div className="text-slate-200">{data?.title}</div>
          <div className="text-xs text-slate-600">{data?.id}</div>
        </div>
      </div>
    </Link>
  )


}