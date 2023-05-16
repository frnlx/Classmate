import { useQuery } from "@tanstack/react-query";
import { API } from "../route-helper";

export const useCategoryData = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const res = await API.Category.get.request(id)
      return res.data
    }
  })
}