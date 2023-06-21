import { CommentFormSchema } from "@/components/classroom/category/post/CommentSection";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ClientAPI } from "./api";
import { useUserid } from "./auth";
import { RewardFormSchema } from "@/components/classroom/rewards/RewardForm";

export const useClassRewards = (classid: string) => {
  const userid = useUserid();
  return useQuery({
    queryKey: ["rewards", classid],
    queryFn() {
      return ClientAPI.getClassRewards({ classid });
    },
  });
};

export const useReward = (classid: string, rewardsid: string) => {
  const userid = useUserid();
  return useQuery({
    queryKey: ["rewards", classid, rewardsid],
    queryFn() {
      return ClientAPI.getReward({ classid, rewardsid });
    },
  });
};

export function useCreateReward(classid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: RewardFormSchema) {
      return ClientAPI.createReward({
        classid,
      }).with(data);
    },

    onSuccess() {
      qc.invalidateQueries(["rewards", classid]);
    },
  });
}

export function useUpdateReward(classid: string, rewardsid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: RewardFormSchema) {
      return ClientAPI.updateReward({ classid, rewardsid }).with(data);
    },

    onSuccess() {
      qc.invalidateQueries(["rewards", classid]);
    },
  });
}

export function useDeleteReward(classid: string, rewardsid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    async mutationFn() {
      const result = await ClientAPI.deleteReward({
        classid,
        rewardsid,
      });

      return result;
    },
  });
}

export function useCreateMemberReward(classid: string, rewardsid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(note: string) {
      return ClientAPI.createMemberReward({
        classid,
        rewardsid,
      }).with({
        note,
      });
    },
  });
}

export function useClaimReward(classid: string, memberrewardid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    async mutationFn() {
      const result = await ClientAPI.claimReward({
        classid,
        memberrewardid,
      }).with({});

      return result;
    },
  });
}
