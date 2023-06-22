import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClassroomWithOwner, ClientAPI } from "./api";
import { useUserid } from "./auth";
import { Classroom, Member, User } from "@prisma/client";
import { EditClassroomFormSchema } from "@/components/form/EditClassForm";

type MemberWithUser = Member & {
  user: User;
};

// Get Class -- 'GET:/classrooms/[classid]' -- https://notion.so/skripsiadekelas/5c9abfbdf06948728a6127e6d5327954
export function useClassroomQuery(
  classid: string,
  initialData?: ClassroomWithOwner
) {
  const userid = useUserid();
  const query = useQuery({
    initialData,
    queryKey: ["classroom", classid],
    queryFn() {
      return ClientAPI.getClassroom({ userid, classid });
    },
  });

  return {
    ...query,
    isAdmin: query.data?.ownerId === userid,
  };
}

// Get Class Members -- 'GET:/classrooms/[classid]/members'
export function useClassroomMembersQuery(
  classid: string,
  initialData?: MemberWithUser[]
) {
  const userid = useUserid();
  return useQuery({
    initialData,
    queryKey: ["classroom-members", classid],
    queryFn() {
      return ClientAPI.getClassroomMembers({ userid, classid });
    },
  });
}

export function useEditClass(classid: string) {
  const userid = useUserid();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: EditClassroomFormSchema) => {
      return ClientAPI.updateClassroom({ userid, classid }).with(values);
    },

    onSuccess: () => {
      const key = ["classroom", classid];
      qc.invalidateQueries(key);
    },
  });
}

export function useDeleteClass(classid: string) {
  const userid = useUserid();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return ClientAPI.deleteClassroom({ userid, classid });
    },

    onSuccess: () => {
      const key = ["user", userid, "classroom"];

      qc.setQueryData(key, (oldclasslist?: Classroom[]) => {
        if (oldclasslist === undefined) {
          console.warn("OldClassList is Undefined? How come.");
        }
        return oldclasslist?.filter((v) => v.id !== classid);
      });
    },
  });
}
