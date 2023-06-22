import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CategoryData } from "@/types/fetchmodels";
import { Category } from "@prisma/client";
import { ClientAPI } from "./api";
import { useUserid } from "./auth";
import { CategoryFormSchema } from "@/app/(member)/[classid]/-Sidebar/CategoryForm";

export function useClassCategories(classid: string, initialData?: Category[]) {
  const userid = useUserid();
  return useQuery({
    enabled: false,
    initialData,
    queryKey: ["classroom", classid, "categories"],
    queryFn() {
      return ClientAPI.getCategoryList({ userid, classid });
    },
  });
}

export function useCreateCategory(classid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn() {
      return ClientAPI.createCategory({ userid, classid }).with({});
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess(newCategory) {
      // ✅ update detail view directly
      qc.setQueryData(
        ["classroom", classid, "categories"],
        (categories?: Category[]) => {
          return categories ? [...categories, newCategory] : categories;
        }
      );
    },
  });
}

// Get Category -- 'GET:/classrooms/[classid]/categories/[categoryid]' -- https://notion.so/skripsiadekelas/21f5c88d01b94bc089bd2d632da5c70f
export function useCategoryData(
  classid: string,
  catid: string,
  initialData: Category
) {
  const userid = useUserid();
  return useQuery({
    enabled: false,
    queryKey: ["category", catid],

    queryFn() {
      return ClientAPI.getCategory({ userid, classid, catid });
    },
  });
}

export function useUpdateCategory(classid: string, catid: string) {
  const userid = useUserid();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CategoryFormSchema) => {
      return ClientAPI.updateCategory({ userid, classid, catid }).with(body);
    },

    onSuccess: () => {
      const key = ["classrooms", classid, "categorylist"];
      qc.invalidateQueries(key);
    },
  });
}
