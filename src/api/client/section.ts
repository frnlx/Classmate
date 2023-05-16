import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "../route-helper"
import { CategoryData } from "@/server/types/fetchmodels";



export const useDeleteSection = (sectionid: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await API.Section.delete.request(sectionid)
      return res.data
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (section) => {
      const categoryid = section.categoryId
      // ✅ update detail view directly
      queryClient.setQueryData(['category', categoryid], (oldcategory?: CategoryData) => {
        let newCategory: CategoryData = JSON.parse(JSON.stringify(oldcategory))

        let sections = newCategory.sections.filter(s => s.id === section.id)
        newCategory.sections = sections
        return oldcategory
      })
      // queryClient.invalidateQueries(['user'])
    },
  })
}