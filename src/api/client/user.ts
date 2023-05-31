import { UserAPI } from "@/api/route-helper";
import { ClassroomData, UserData } from "@/types/fetchmodels";
import { Classroom } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

export const useUserID = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect('/auth')
    }
  })
  if(!session) redirect('/auth')
  return session.user.id
}


// Get User -- 'GET:/users/[userid]' -- https://notion.so/skripsiadekelas/0fde89a6f40d486282ad9c190c167ce7
export const useUser = () => {
  const userid = useUserID();
  return useQuery({
    enabled: !!userid,

    queryKey:
      ['user', userid],
    
    queryFn: async () =>
      UserAPI
        .GetUserData(userid).then(res => res.data),
    
  })
}

// Get Joined Classrooms -- 'GET:/users/[userid]/classrooms' -- https://notion.so/skripsiadekelas/bf08bd8c8a0a43e4a9f0f0036c2bdf37
export const useUserClassList = (classlist?: Classroom[]) => {
  const userid = useUserID();
  const queryCilent = useQueryClient()
  return useQuery({
    enabled: !!userid,

    queryKey:
      ['user', userid, 'classrooms'],
    
    queryFn: async () =>
      UserAPI
        .GetUserJoinedClassrooms(userid)
        .then(res => res.data),
    
    initialData: () =>
      queryCilent
        .getQueryData<UserData>(['user', userid])?.classes ?? classlist ?? console.log('No Initial Data')
  })
}

export const useInvalidateUserData = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ['user'] })
}

// Join Class -- 'PATCH:/users/[userid]/joinClass' -- https://notion.so/skripsiadekelas/ae0d2a35550145c69ef1f51c0afc0be8
export const useJoinClass = (userid: string, classid: string) => {
  const queryClient = useQueryClient()
  return useMutation({

    mutationFn: () =>
      UserAPI
        .JoinClass(userid, { classid })
        .then(res => res.data),
    
    onSuccess: (newClassroom) => {
      queryClient
        .setQueryData(['user', userid, 'classrooms'], (classroomlist?: ClassroomData[]) => {
          if (classroomlist === undefined)
            queryClient.invalidateQueries(['user', userid, 'classrooms'])
          else {
            let newClassroomList: ClassroomData[] = JSON.parse(JSON.stringify(classroomlist))
            newClassroomList.push(newClassroom)
            return newClassroomList
          }
        })
    },
  })
}

// Create Classroom -- 'POST:/users/[userid]/classrooms' -- https://notion.so/skripsiadekelas/090d86a5d6644de196a2f896406ae69d
export const useCreateClass = () => {
  const userid = useUserID()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () =>
      UserAPI
        .CreateClassroom(userid)
        .then(res => res.data),

    onSuccess: (newClassroom) => 
      queryClient
        .setQueryData(['user', userid, 'classrooms'], (classroomlist?: ClassroomData[]) => {
          if (classroomlist === undefined) {
            queryClient.invalidateQueries(['user', userid, 'classrooms'])
          }
          else {
            let newClassroomList: ClassroomData[] = JSON.parse(JSON.stringify(classroomlist))
            newClassroomList.push(newClassroom)
            return newClassroomList
          }
        })
    
  })
}