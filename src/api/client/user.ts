import { Classroom, Member, User } from "@prisma/client";
import { useUserid } from "./auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientAPI } from "./api";
import { InferedCreateClassroomFormSchema } from "@/components/form/CreateClassForm";
import { EditClassroomFormSchema } from "@/components/form/EditClassForm";
import { EditProfileFormSchema } from "@/components/home/dashboard/EditProfile";
import { useSession } from "next-auth/react";

export function useUserClassList(
  initialData?: (Member & {
    classroom: Classroom;
  })[]
) {
  const userid = useUserid();
  return useQuery(["user", userid, "classroom"], {
    initialData,
    queryFn: () => ClientAPI.getClassroomList({ userid }),
  });
}

export function useJoinClass() {
  const userid = useUserid();
  const qc = useQueryClient();
  return useMutation({
    mutationFn(classid: string) {
      return ClientAPI.joinClassroom({ userid, classid });
    },

    onSuccess(newClassroom: Classroom) {
      // Server may return empty, so dont do anything
      if (!!!newClassroom) return;
      qc.invalidateQueries(["classlist"]);
    },
  });
}

export function useUpdateUser() {
  const userId = useUserid();
  return useMutation({
    mutationFn(data: EditProfileFormSchema) {
      return ClientAPI.updateUser({ userid: userId }).with(data);
    },
  });
}

export function useRemoveUser(classId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn(userId: string) {
      return ClientAPI.leaveClassroom({ userid: userId, classid: classId });
    },

    onSuccess() {
      qc.invalidateQueries(["classroom-members", classId]);
    },
  });
}

export function useLeaveClass() {
  const userid = useUserid();
  const qc = useQueryClient();
  return useMutation({
    mutationFn(classid: string) {
      return ClientAPI.leaveClassroom({ userid, classid });
    },

    onSuccess(leftClassroom, classid) {
      // Server may return empty, so dont do anything
      if (!!!leftClassroom) return;

      qc.setQueriesData(
        ["user", userid, "classroom"],
        (classroomlist?: Classroom[]) => {
          return classroomlist?.filter((c) => c.id !== classid);
        }
      );
    },
  });
}
