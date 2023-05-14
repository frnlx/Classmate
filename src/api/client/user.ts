import { Routes } from "@/client/lib/route-helper";
import { UserData } from "@/server/types/fetchmodels";
import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useUserData = (): UseQueryResult<UserData> => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get(Routes.UserInfo(session!.user.id));
      return await res.data as UserData
    }
  })
}
export const useInvalidateUserData = () => {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ['user'] })
}