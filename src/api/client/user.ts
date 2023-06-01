import { ClientAPI, GET, UserAPI } from "@/api/route-helper"
import { ClassroomData, UserData } from "@/types/fetchmodels";
import { Classroom } from "@prisma/client"
import { InitialDataFunction, QueryFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import { useSessionRequired, useUserQuery } from "./auth"

export function useNavbarData(prefetched?: Classroom[]) {

  const { data } = useSessionRequired()
  const queryKey = ['user', data?.user.id, 'classroom']

  return useQuery({
    enabled: !!data, queryKey: key,
    initialData:
      () => prefetched,
    queryFn:
      () => UserAPI.GetUserJoinedClassrooms(data!.user.id)
  })


}



// Get User -- 'GET:/users/[userid]' -- https://notion.so/skripsiadekelas/0fde89a6f40d486282ad9c190c167ce7
export const useUser = (prefetchedData?: UserData) => {
  // Fetch necessary information
  return useUserQuery<UserData>({
    key: ['user', userid],
    init: prefetchedData,
    fn: ClientAPI.user.getData(userid)
  })


  return useUserQuery<UserData>(
    ['user', userid],

    async () => UserAPI.GetUserData(userid),
    {
      enabled: !!userid,
      initialData: prefetchedData,
    }
  )
}

// Get Joined Classrooms -- 'GET:/users/[userid]/classrooms' -- https://notion.so/skripsiadekelas/bf08bd8c8a0a43e4a9f0f0036c2bdf37
export const useUserClassList = (classlist?: Classroom[]) => {
  const userid = useUserID();
  const queryCilent = useQueryClient()
  return useQuery(['user', userid, 'classrooms'],
    async () => UserAPI.GetUserJoinedClassrooms(userid),
    {
      enabled: !!userid,
      initialData: () =>
        queryCilent.getQueryData<UserData>(['user', userid])?.classes
        ?? classlist
        ?? console.log('No Initial Data')
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
      UserAPI.CreateClassroom(userid),

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