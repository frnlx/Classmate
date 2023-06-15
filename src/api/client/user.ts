import { Classroom, User } from "@prisma/client"
import { useUserid } from "./auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ClientAPI } from "./api"
import { InferedCreateClassroomFormSchema } from "@/components/form/CreateClassForm"
import { EditClassroomFormSchema } from "@/components/form/EditClassForm"
import { EditProfileFormSchema } from "@/components/home/dashboard/EditProfile"
import { useSession } from "next-auth/react"

export function useUserClassList(initialData?: Classroom[]) {
  const userid = useUserid()
  return useQuery(['user', userid, 'classroom'], {
    enabled: false,
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
      // Server may return empty, so dont do anything
      if (!!!newClassroom) return;

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
    
    mutationFn: (values: InferedCreateClassroomFormSchema) => {
      return ClientAPI.createClassroom({ userid }).with(values)
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

export function useUpdateUser() {
  const userId = useUserid()
  return useMutation({
    mutationFn(data: EditProfileFormSchema) {
      return ClientAPI.updateUser({ userid: userId }).with(data)
    },
  })
}

export function useRemoveUser(classId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn(userId: string) {
      return ClientAPI.leaveClassroom({ userid: userId, classid: classId })
    },
    
    onSuccess() {
      qc.invalidateQueries(["classroom-members", classId])
    }
  })
}

export function useLeaveClass() {
  const userid = useUserid()
  const qc = useQueryClient()
  return useMutation({
    mutationFn(classid: string) {
      return ClientAPI.leaveClassroom({ userid, classid })
    },
    
    onSuccess(leftClassroom) {
      // Server may return empty, so dont do anything
      if (!!!leftClassroom) return;

      qc.setQueriesData(['user', userid, 'classroom'],
        (classroomlist?: Classroom[]) => {
          return classroomlist?.filter((c) => c.id !== leftClassroom.id)
        }
      )
    }

  })
}
