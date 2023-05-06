import { Routes } from "@/component/lib/route-helper";
import { CategoryData } from "@/server/types/fetchmodels";
import { Plus } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type param = {
  categoryid: string,
  onSuccess?: (data: CategoryData) => void,
  onError?: () => void
}

const AddSectionButton = ({ categoryid }: param) => {
  
  const queryClient = useQueryClient()
  const addSectionMutation = useMutation<CategoryData>({
    mutationFn: () => {
      return axios.post(Routes.SectionCreate(categoryid)).then(res => res.data)
    },
    onSuccess(data, error) {
      queryClient.invalidateQueries(['category', categoryid])
    },
  })



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