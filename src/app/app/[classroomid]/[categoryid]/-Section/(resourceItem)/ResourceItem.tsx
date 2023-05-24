import { Note } from "@phosphor-icons/react";
import { Resource } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ResourceItem = (p: {
  data: Resource
}) => {
  const pathname = usePathname()
  return (
    <Link href={`${pathname}/${p.data.id}`}>
      <div className="px-2 py-3 flex flex-row items-center gap-2 hover:bg-slate-700/25 hover:text-slate-300 rounded-md">
        <div className="p-2 rounded-xl bg-slate-700">
          <Note className="text-2xl"/>
        </div>
        <div>
          <div className="text-slate-200">{p.data.title}</div>
          <div className="text-xs text-slate-600">{p.data.id}</div>
        </div>
      </div>
    </Link>
  );
}
 
export default ResourceItem;