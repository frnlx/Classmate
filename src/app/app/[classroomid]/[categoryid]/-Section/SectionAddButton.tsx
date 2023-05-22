import { useCreateSection } from "@/api/client/section";
import { useRoom } from "@/app/app/-Navbar/RoomContext";
import { CategoryData } from "@/types/fetchmodels";
import { Plus } from "@phosphor-icons/react";

type param = {
  categoryid: string,
  onSuccess?: (data: CategoryData) => void,
  onError?: () => void
}

const AddSectionButton = ({ categoryid }: param) => {
  
  const room = useRoom()
  const addSectionMutation = useCreateSection(room.current.id, categoryid)



  return (
    <button type='button' onClick={() => addSectionMutation.mutate()}
      className="px-4 p-2 flex flex-row items-center gap-2 text-slate-500 hover:text-slate-300 w-full rounded-md"
    >
      <span className="p-1 rounded-md">
        <Plus weight="bold"/>
      </span>
      <span className="text-sm font-semibold">
        Add a section
      </span>
    </button>
  )
}
 
export default AddSectionButton;