import { useQuery } from "@tanstack/react-query"
import { ClientAPI } from "./api"
import { useUserid } from "./auth"

// Get Class -- 'GET:/classrooms/[classid]' -- https://notion.so/skripsiadekelas/5c9abfbdf06948728a6127e6d5327954
export const useClassroomQuery = (classid: string) => {
  const userid = useUserid()
  return useQuery({
    queryKey:
      ['classroom', classid],
    
    enabled: !!classid,

    queryFn: async () =>
      ClientAPI.getClassroom({ userid, classid })
  })
}