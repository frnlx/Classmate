import { ClassroomData, UserData } from "@/types/fetchmodels"
import { Classroom } from "@prisma/client"
import { useSessionRequired, useUserid } from "./auth"
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
  const { setQueriesData, fetchQuery } = useQueryClient()
  return useMutation({
    
    mutationFn(classid: string) {
      return ClientAPI.joinClassroom({ userid, classid })
    },
    
    onSuccess(newClassroom) {
      return setQueriesData(['user', userid, 'classroom'],
        (classroomlist?: Classroom[]) => {
          return classroomlist ? [...classroomlist, newClassroom] : classroomlist
        }
      )
    }

  })
}

// Create Classroom -- 'POST:/users/[userid]/classrooms' -- https://notion.so/skripsiadekelas/090d86a5d6644de196a2f896406ae69d
export const useCreateClass = () => {

  const userid = useUserid()
  const queryClient = useQueryClient()
  return useMutation({
    
    mutationFn() {
      return ClientAPI.createClassroom({ userid }).with({})
    },

    onSuccess: (newClassroom) => queryClient
      .setQueryData(['user', userid, 'classrooms'], (classroomlist?: Classroom[]) => {
        if (classroomlist === undefined) {
          queryClient.invalidateQueries(['user', userid, 'classrooms'])
        }
        else {
          let newClassroomList: Classroom[] = JSON.parse(JSON.stringify(classroomlist))
          newClassroomList.push(newClassroom)
          return newClassroomList
        }
      })
  })
}