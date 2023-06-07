import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SectionData } from "@/types/fetchmodels";
import { ClientAPI } from "./api"
import { useUserid } from "./auth"
import { Section } from "@prisma/client"

export const useCategorySections = (classid: string, categoryid: string) => {
  const userid = useUserid()
  return useQuery({
    queryKey:
      ['category', categoryid, 'sections'],
    
    queryFn: async () => ClientAPI.getSectionList({ userid, classid, catid: categoryid})
  })
}

export function useCreateSection(classid: string, categoryid: string) {
  const qc = useQueryClient()
  const userid = useUserid()
  return useMutation({

    mutationFn() {
      return ClientAPI.createSection({ userid, classid, catid: categoryid }).with({})
    },
    
    onSuccess: (newSection) => {
      qc.setQueryData(['category', categoryid, 'sections'],
        (sections?: Section[]) => {
          return sections ? [...sections, newSection] : sections
        }
      )
    }

  })
}