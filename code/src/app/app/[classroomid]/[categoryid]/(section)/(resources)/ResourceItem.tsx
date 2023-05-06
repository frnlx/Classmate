import { Note } from "@phosphor-icons/react";
import { Resource } from "@prisma/client";

const ResourceItem = (p: {
  data: Resource
}) => {
  return (
    <div className="px-2 py-3 flex flex-row items-center gap-2">
      <div className="p-2 rounded-xl bg-slate-700">
        <Note className="text-2xl"/>
      </div>
      <div>
        <div className="text-slate-200">{p.data.title}</div>
        <div className="text-xs text-slate-600">{p.data.id}</div>
      </div>
    </div>
  );
}
 
export default ResourceItem;