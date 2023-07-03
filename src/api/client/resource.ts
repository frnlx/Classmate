import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClientAPI, CommentWithUser, ResourcePopulated } from "./api";
import { useUserid } from "./auth";
import { Comment, Resource } from "@prisma/client";
import { ResourceFormSchema } from "@/components/classroom/category/resources/AddResource";
import { CommentFormSchema } from "@/components/classroom/category/post/CommentSection";
import { AttachmentRequest } from "../route/resource";

// Get Section Resources -- 'GET:/classrooms/[classid]/categories/[categoryid]/sections/[sectionid]/resources' -- https://notion.so/skripsiadekelas/63010a1242af4058898dce5b067f5da0
export const useCategoryResources = (classid: string, categoryid: string) => {
  const userid = useUserid();
  return useQuery({
    queryKey: ["category", categoryid, "resources"],
    queryFn() {
      return ClientAPI.getResourceList({ userid, classid, catid: categoryid });
    },
  });
};

export function useCreateResource(classid: string, catid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: ResourceFormSchema) {
      return ClientAPI.createResource({
        userid,
        classid,
        categoryid: catid,
      }).with(data);
    },

    onSuccess() {
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}

export function useUpdateResource(
  classid: string,
  catid: string,
  resid: string
) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: ResourceFormSchema) {
      return ClientAPI.updateResource({ userid, classid, catid, resid }).with(
        data
      );
    },

    onSuccess() {
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}

export function useCreateComment(
  classid: string,
  catid: string,
  resid: string
) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    async mutationFn(data: CommentFormSchema) {
      const result = await ClientAPI.createComment({
        userid,
        classid,
        catid,
        resid,
      }).with(data);

      return {
        ...result,
        id: result.id,
      };
    },

    onSuccess() {
      qc.invalidateQueries(["comment", resid]);
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}

export function useComments(
  classid: string,
  categoryid: string,
  resourceid: string,
  initialData?: CommentWithUser[]
) {
  const userid = useUserid();
  return useQuery({
    initialData,
    queryKey: ["comment", resourceid],
    async queryFn() {
      const result = await ClientAPI.getComments({
        userid,
        classid,
        catid: categoryid,
        resid: resourceid,
      });
      return result.map((comment) => ({
        ...comment,
        createdAt: new Date(comment.createdAt),
        id: comment.id, // Restore BigInt
      }));
    },
  });
}

export function useDeleteComment(
  classid: string,
  catid: string,
  resid: string
) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(commentId: string) {
      return ClientAPI.deleteComment({
        userid,
        classid,
        catid,
        resid,
        commentid: commentId,
      });
    },

    onSuccess() {
      qc.invalidateQueries(["comment", resid]);
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}

export function useDeleteResource(classid: string, catid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(resid: string) {
      return ClientAPI.deleteResource({
        userid,
        classid,
        catid,
        resid,
      });
    },

    onSuccess() {
      qc.invalidateQueries(["category", catid, "resources"]);
    },
  });
}

export function useCreateAttachment() {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(data: AttachmentRequest) {
      return ClientAPI.createAttachment({ userid }).with(data);
    },
  });
}

export function useCreateSubmission(
  classid: string,
  catid: string,
  resid: string
) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(attachmentId: string) {
      return ClientAPI.createSubmission({
        userid,
        catid,
        classid,
        resid,
      }).with({
        attachmentId,
      });
    },
  });
}

export function useGradeSubmission(sid: string) {
  const userid = useUserid();
  const qc = useQueryClient();

  return useMutation({
    mutationFn(giveRewards: boolean) {
      return ClientAPI.gradeSubmission({
        submissionid: sid,
      }).with({
        giveRewards,
      });
    },
  });
}
