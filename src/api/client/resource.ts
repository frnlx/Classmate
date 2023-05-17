import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ClassAPI } from "../route-helper"

// Get Section Resources -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources' -- https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
export const useSectionResources = (classid: string, categoryid: string, sectionid: string) => {
  return useQuery({
    queryKey: 
      ['section', sectionid, 'resources'],
    
    queryFn: async () =>
      ClassAPI
        .GetSectionResources(classid, categoryid, sectionid).then(res => res.data)
  })
}

// Create Resource -- 'POST:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources' -- https://notion.so/skripsiadekelas/a8f870526a074612b4f96e812bb3a67b
export const useCreateResource = (classid: string, categoryid: string, sectionid: string) => { 
  const qc = useQueryClient()
  return useMutation({

    mutationFn: async () =>
      ClassAPI 
        .CreateResource(classid, categoryid, sectionid).then(res => res.data),
    
    onSuccess: async (newResource) => {
      qc.invalidateQueries(['section', sectionid, 'resources'])
    }
    
  })
}

// Get Resource -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]' -- https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
export const useGetResource = (classid: string, categoryid: string, sectionid: string, resourceid: string) => {
  return useQuery({
    queryKey:
      ['resource', resourceid],

    queryFn: async () =>
      ClassAPI
        .GetResource(classid, categoryid, sectionid, resourceid).then(res => res.data)
  })
}

// Delete Resource -- 'DELETE:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]' -- https://notion.so/skripsiadekelas/707c29316b2d45459c6220ed527c3655
export const useDeleteResource = (classid: string, categoryid: string, sectionid: string, resourceid: string) => {
  const qc = useQueryClient()
  return useMutation({

    mutationFn: async () =>
      ClassAPI
        .DeleteResource(classid, categoryid, sectionid, resourceid).then(res => res.data),

    onSuccess: async (deletedResource) => {
      qc.invalidateQueries(['section', sectionid, 'resources'])
    }

  })
}