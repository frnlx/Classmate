import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Routes } from "../route-helper"
import { UserData } from "@/server/types/fetchmodels"
import { Category } from "@prisma/client"

export const useCreateCategory = (classid: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () =>
      axios
        .post(Routes.ClassCategoryCreate(classid))
        .then((response) => response.data as Category),
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCategory) => {
      // ✅ update detail view directly
      queryClient.setQueryData(['user'], (userdata?: UserData) => {
        let newUserData: UserData = JSON.parse(JSON.stringify(userdata))
        let classroom = newUserData?.classes!.filter(c => c.id === classid)[0]!
        classroom.categories.push(newCategory);
        return newUserData
      })
      // queryClient.invalidateQueries(['user'])
    },
  })  
}