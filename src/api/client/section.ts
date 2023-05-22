import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SectionData } from "@/types/fetchmodels";
import { ClassAPI } from "../route-helper";

// Get Category Sections -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections' -- https://notion.so/skripsiadekelas/4deb71d64df8435bb817d72db0809bd9
export const useCategorySections = (classid: string, categoryid: string) => {
  return useQuery({
    queryKey:
      ['category', categoryid, 'sections'],
    
    queryFn: async () => 
      ClassAPI
        .GetCategorySections(classid, categoryid).then(res => res.data)
  })
}

// Create Section -- 'POST:/classrooms/[classid]/categories/[categoryid]/sections' -- https://notion.so/skripsiadekelas/48c756edc1784e08bdf3b4ea1ea35022
export const useCreateSection = (classid: string, categoryid: string) => {
  const queryClient = useQueryClient()
  return useMutation({

    mutationFn: async () => 
      ClassAPI
        .CreateSection(classid, categoryid).then(res => res.data),
    
    onSuccess: (newSection) => {
      queryClient.setQueryData(['category', categoryid, 'sections'], (sections?: SectionData[]) => {
        if (sections === undefined)
          queryClient.invalidateQueries(['category', classid, 'categories'])
        else {
          let newSectionList: SectionData[] = JSON.parse(JSON.stringify(sections))
          newSectionList.push(newSection)
          return newSectionList
        }
      })

    }

  })
}

// Get Section -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]' -- https://notion.so/skripsiadekelas/9034f0f58ae14c9f8c4065c277b578bf
export const useSectionData = (classid: string, categoryid: string, sectionid: string) => {
  return useQuery({
    queryKey: 
      ['section', sectionid],
    
    queryFn: async () =>
      ClassAPI
        .GetSection(classid, categoryid, sectionid).then( res => res.data )
  })
}

// Delete Section -- 'DELETE:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]' -- https://notion.so/skripsiadekelas/2cff42aa237a4cc68ee23aba3b53ed0f
export const useDeleteSection = (classid: string, categoryid: string, sectionid: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => 
      ClassAPI.DeleteSection(classid, categoryid, sectionid).then(res => res.data),
    
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (deletedSection) => {
      queryClient.setQueryData(['category', categoryid, 'sections'], (sectionlist?: SectionData[]) => {
        if(!sectionlist) return // do nothing
        let newSectionList: SectionData[] = JSON.parse(JSON.stringify(sectionlist))
        newSectionList = newSectionList.filter(s => s.id === deletedSection.id)
        return newSectionList
      })
    },
  })
}