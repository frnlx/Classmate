import { useQuery } from "@tanstack/react-query";
import { ClientAPI } from "./api";
import { useUserid } from "./auth";
import { Classroom, User } from "@prisma/client";

// Get Class -- 'GET:/classrooms/[classid]' -- https://notion.so/skripsiadekelas/5c9abfbdf06948728a6127e6d5327954
export function useClassroomQuery(classid: string, initialData?: Classroom) {
  const userid = useUserid();
  return useQuery({
    initialData,
    queryKey: ["classroom", classid],
    queryFn() {
      return ClientAPI.getClassroom({ userid, classid });
    },
  });
}

// Get Class Members -- 'GET:/classrooms/[classid]/members'
export function useClassroomMembersQuery(
  classid: string,
  initialData?: User[]
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
