import { Routes, UserAPI } from "@/api/route-helper";
import { ClassroomData, UserData } from "@/server/types/fetchmodels";
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
  return session!.user.id
}

export const useUser = () => {
  const userid = useUserID();
  return useQuery({
    enabled: !!userid,

    queryKey:
      ['user', userid],
    
    queryFn: async () =>
      UserAPI
        .GetUserData(userid)
        .then(res => res.data),
    
  })
}

export const useUserClassList = () => {
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
        .getQueryData<UserData>(['user', userid])?.classes
  })
}



export const useInvalidateUserData = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ['user'] })
}

// untested
export const useJoinClass = (userid: string, classid: string) => {
  const queryClient = useQueryClient()
  return useMutation({

    mutationFn: () =>
      UserAPI
        .JoinClass(userid, { classid })
        .then(res => res.data),
    
    onSuccess: (newClassroom) => {
      queryClient
        .setQueryData(['user', userid, 'classrooms'], (userdata?: UserData) => {
          let newUserData: UserData = JSON.parse(JSON.stringify(userdata))
          newUserData?.classes.push(newClassroom)
          return newUserData
        })
    },

  })
}