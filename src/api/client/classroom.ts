import { useQuery } from "@tanstack/react-query"
import { ClassAPI } from "../route-helper"

// Get Class -- 'GET:/classrooms/[classid]' -- https://notion.so/skripsiadekelas/5c9abfbdf06948728a6127e6d5327954
export const useClassroomQuery = (classroomid?: string) => {
  return useQuery({
    queryKey:
      ['classroom', classroomid],
    
    enabled: !!classroomid,

    queryFn: async () =>
      classroomid ? ClassAPI
        .GetClassData(classroomid).then(res => res.data) : null
  })
}