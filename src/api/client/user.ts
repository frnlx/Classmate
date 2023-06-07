import { Classroom } from "@prisma/client"
import { useUserid } from "./auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ClientAPI } from "./api"

export function useUserClassList(initialData?: Classroom[]) {
  const userid = useUserid()
  return useQuery(['user', userid, 'classroom'], {
    initialData,
    queryFn:
      () => ClientAPI.getClassroomList({ userid }),
  })
}

export function useJoinClass() {

  const userid = useUserid()
  const qc = useQueryClient()
  return useMutation({
    
    mutationFn(classid: string) {
      return ClientAPI.joinClassroom({ userid, classid })
    },
    
    onSuccess(newClassroom) {
      qc.setQueriesData(['user', userid, 'classroom'],
        (classroomlist?: Classroom[]) => {
          return classroomlist ? [...classroomlist, newClassroom] : classroomlist
        }
      )
    }

  })
}

// Create Classroom -- 'POST:/users/[userid]/classrooms' -- https://notion.so/skripsiadekelas/090d86a5d6644de196a2f896406ae69d
export function useCreateClass () {

  const userid = useUserid()
  const qc = useQueryClient()
  return useMutation({
    
    mutationFn: () => {
      return ClientAPI.createClassroom({ userid }).with({})
    },

    onSuccess: (newclass) => {
      
      const key = ['user', userid, 'classroom']

      qc.setQueryData(key, (oldclasslist?: Classroom[]) => {
        if (oldclasslist === undefined) {
          console.warn("OldClassList is Undefined? How come.")
        }
        return oldclasslist ? [...oldclasslist, newclass] : undefined
      })

    }

  })

}