import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ClientAPI } from "./api"
import { useUserid } from "./auth"

// Get Section Resources -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources' -- https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
export const useSectionResources = (classid: string, categoryid: string, sectionid: string) => {
  const userid = useUserid()
  return useQuery({
    queryKey: ['section', sectionid, 'resources'],
    queryFn() {
      return ClientAPI.getResourceList({ userid, classid, catid: categoryid, sectid: sectionid })
    }
  })
}

// Get Resource -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]' -- https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
export function useGetResource(classid: string, categoryid: string, sectionid: string, resourceid: string) {
  const userid = useUserid()
  return useQuery({
    queryKey:['resource', resourceid],
    queryFn() {
      return ClientAPI.getResource({ userid, classid, catid: categoryid, sectid: sectionid, resid: resourceid })
    }
  })
}
