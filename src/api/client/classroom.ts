import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ClassAPI } from "../route-helper"
import { CategoryData } from "@/server/types/fetchmodels"

// Get Class -- 'GET:/classrooms/[classid]' -- https://notion.so/skripsiadekelas/5c9abfbdf06948728a6127e6d5327954
export const useClassroomQuery = (classroomid: string) => {
  return useQuery({
    queryKey:
      ['classroom', classroomid],

    queryFn: async () =>
      ClassAPI
        .GetClassData(classroomid).then(res => res.data)
  })
}