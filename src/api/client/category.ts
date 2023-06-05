import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryData } from "@/types/fetchmodels";
import { Category } from "@prisma/client"
import { ClientAPI } from "./api"
import { useUserid } from "./auth"

// Get Class Categories -- 'GET:/classrooms/[classid]/categories' -- https://notion.so/skripsiadekelas/df2bc14815614458b6875a695237f5eb
export const useClassCategories = (classid: string, initialData?: Category[]) => {
  const userid = useUserid()
  return useQuery({
    initialData,
    queryKey:
      ['classroom', classid, 'categories'],
    queryFn() {
      return ClientAPI.getCategoryList({ userid, classid, })
    } 
  })
}

// Create Category -- 'POST:/classrooms/[classid]/categories' -- https://notion.so/skripsiadekelas/430315c8671c4569b6e3ca941a9494c5
export const useCreateCategory = (classid: string) => {
  const userid = useUserid()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn:
      () => ClientAPI.createCategory({ userid, classid }).with({}),

    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCategory) => {
      // ✅ update detail view directly
      queryClient
        .setQueryData(['classroom', classid, 'categories'], (categories?: Category[]) => {
          if (categories === undefined)
            queryClient.invalidateQueries(['classroom', classid, 'categories'])
          else {
            let newCategoryList: Category[] = [...categories, newCategory]
            return newCategoryList
          }
        })
    },
  })
}

// Get Category -- 'GET:/classrooms/[classid]/categories/[categoryid]' -- https://notion.so/skripsiadekelas/21f5c88d01b94bc089bd2d632da5c70f
export const useCategoryData = (classid: string, catid: string) => {
  const userid = useUserid()
  return useQuery({
    queryKey:
      ['category', catid],

    queryFn: async () =>
      ClientAPI.getCategory({ userid, classid, catid })
  })
}

// Delete Category -- 'DELETE:/classrooms/[classid]/categories/[categoryid]' -- https://notion.so/skripsiadekelas/ee287838e9b94ee9ae79acb249172aa1
export const useDeleteCategory = (classid: string, categoryid: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      ClassAPI
        .DeleteCategory(classid, categoryid).then(res => res.data),

    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (deletedCategory) => {
      // ✅ update detail view directly
      queryClient
        .setQueryData(['classroom', classid, 'categories'], (categories?: CategoryData[]) => {
          if (categories === undefined)
            queryClient.invalidateQueries(['classroom', classid, 'categories'])
          else {
            let newCategoryList: CategoryData[] = JSON.parse(JSON.stringify(categories))
            newCategoryList = newCategoryList.filter(c => c.id !== deletedCategory.id)
            return newCategoryList
          }
        })
    },
  })
}