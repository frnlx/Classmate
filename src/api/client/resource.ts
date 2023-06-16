import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientAPI, ResourcePopulated } from "./api";
import { useUserid } from "./auth";
import { Resource } from "@prisma/client";
import { ResourceFormSchema } from "@/components/classroom/category/resources/AddResource";

// Get Section Resources -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources' -- https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
export const useCategoryResources = (
  classid: string,
  categoryid: string,
  initialData?: ResourcePopulated[]
) => {
  const userid = useUserid();
  return useQuery({
    initialData,
    queryKey: ["category", categoryid, "resources"],
    queryFn() {
      return ClientAPI.getResourceList({ userid, classid, catid: categoryid });
    },
  });
};

// Get Resource -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources/[resourceid]' -- https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
export function useGetResource(
  classid: string,
  categoryid: string,
  resourceid: string,
  initialData?: ResourcePopulated
) {
  const userid = useUserid();
  return useQuery({
    initialData,
    queryKey: ["resource", resourceid],
    queryFn() {
      return ClientAPI.getResource({
        userid,
        classid,
        catid: categoryid,
        resid: resourceid,
      });
    },
  });
}

export function useCreateResource(classid: string, catid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: ResourceFormSchema) {
      return ClientAPI.createResource({ userid, classid, catid }).with(data);
    },

    onSuccess() {
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}
