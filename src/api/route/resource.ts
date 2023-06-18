import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";
import { ResourceFormSchema } from "@/components/classroom/category/resources/AddResource";
import { ResourceType } from "@prisma/client";
import { CommentFormSchema } from "@/components/classroom/category/post/CommentSection";

export type AttachmentRequest = {
  filename: string;
  data: string;
};

const resource = {
  async getData(_, res, [uid, cid, catid, rid]) {
    await membersOnly();

    const data = await prisma.user.findUniqueOrThrow({
      where: { id: uid },
      select: {
        memberClasses: {
          where: { classroomId: cid },
          include: {
            classroom: {
              select: {
                categories: {
                  where: { id: catid },
                  include: {
                    Resource: {
                      where: {
                        id: rid,
                      },
                      include: {
                        Assignment: true,
                        Discussion: true,
                        _count: {
                          select: { Comment: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.json(data.memberClasses[0].classroom.categories[0].Resource[0]);
  },

  async getResourceComments(_, res, [uid, cid, catid, rid]) {
    await membersOnly();
    const comments = await prisma.comment.findMany({
      where: { resourceId: rid },
      include: {
        user: true,
      },
    });

    return res.json(
      comments.map((comment) => ({
        ...comment,
        id: comment.id.toString(), // BigInt hotfix, will be reconverted to BigInt in client
      }))
    );
  },

  async createComment(_, res, [uid, cid, catid, rid], body: CommentFormSchema) {
    await membersOnly();
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        user: { connect: { id: uid } },
        resource: { connect: { id: rid } },
      },
    });

    return res.json({
      ...comment,
      id: comment.id.toString(), // BigInt hotfix, will be reconverted to BigInt in client
    });
  },

  async deleteComment(_, res, [uid, cid, catid, rid, commentid]) {
    await membersOnly();
    const classroom = await prisma.classroom.findFirstOrThrow({
      where: { id: cid },
    });
    if (classroom.ownerId === uid) {
      await prisma.comment.delete({
        where: {
          id: BigInt(commentid),
        },
      });
    } else {
      await prisma.comment.deleteMany({
        where: {
          id: BigInt(commentid),
          userId: uid,
        },
      });
    }

    return res.json({
      message: "OK",
    });
  },

  async deleteResource(_, res, [uid, cid, catid, rid, commentid]) {
    await membersOnly();
    await prisma.resource.deleteMany({
      where: {
        id: rid,
        userId: uid,
      },
    });

    return res.json({
      message: "OK",
    });
  },

  async createResource(_, res, [uid, cid, catid], body: ResourceFormSchema) {
    const dbData: any = {
      title: body.title,
      content: body.content,
      category: {
        connect: { id: catid },
      },
      user: {
        connect: { id: uid },
      },
      type: body.type,
      order: 0,
    };

    if (body.attachmentId) {
      dbData.attachment = { connect: { id: body.attachmentId } };
    }

    const resource = await prisma.resource.create({
      data: dbData,
    });

    if (body.type === ResourceType.NORMAL_POST) {
      await prisma.normalPost.create({
        data: {
          resource: { connect: { id: resource.id } },
        },
      });
    } else if (body.type === ResourceType.ASSIGNMENT) {
      await prisma.assignment.create({
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
          resource: { connect: { id: resource.id } },
        },
      });
    } else {
      await prisma.discussion.create({
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
          resource: { connect: { id: resource.id } },
        },
      });
    }

    return res.json(resource);
  },

  async updateResource(
    _,
    res,
    [uid, cid, catid, rid],
    body: ResourceFormSchema
  ) {
    const resource = await prisma.resource.findFirstOrThrow({
      where: { id: rid },
    });

    if (body.type !== resource.type) {
      throw Error("Cannot do that");
    }

    let newData: any = {
      title: body.title,
      content: body.content,
    };

    if (body.attachmentId) {
      resource.attachmentId &&
        (await prisma.resource.update({
          where: { id: rid },
          data: {
            attachment: { delete: true },
          },
        }));
      newData.attachment = { connect: { id: body.attachmentId } };
    }

    const updatedResource = await prisma.resource.update({
      where: { id: rid },
      data: newData,
    });

    if (body.type === ResourceType.ASSIGNMENT) {
      await prisma.assignment.update({
        where: { id: rid },
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
        },
      });
    } else if (body.type === ResourceType.DISCUSSION) {
      await prisma.discussion.update({
        where: { id: rid },
        data: {
          dueDate: body.dueDate,
          point: body.point,
          xpReward: body.xp,
        },
      });
    }

    return res.json(updatedResource);
  },

  async createAttachment(_, res, __, body: AttachmentRequest) {
    const attachment = await prisma.attachment.create({
      data: {
        filename: body.filename,
        data: body.data,
      },
    });

    return res.json({
      id: attachment.id,
    });
  },

  async getAttachment(_, res, [aid]) {
    const attachment = await prisma.attachment.findUniqueOrThrow({
      where: { id: aid },
    });

    const data = await fetch(attachment.data);
    return res.send(await data.blob(), attachment.filename);
  },
} satisfies HandlerLookup;

export const resourceRoutes = {
  // Get Resource	https://notion.so/skripsiadekelas/b362f54d439f48e2ba91828fb82c4590
  "POST:/users/[userid]/attachment": resource.createAttachment,
  "GET:/attachment/[attachmentid]": resource.getAttachment,
  "GET:/users/[userid]/classrooms/[classid]/categories/[categoryid]/resources/[resourceid]":
    resource.getData,
  "POST:/users/[userid]/classrooms/[classid]/categories/[categoryid]":
    resource.createResource,
  "POST:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment":
    resource.createComment,
  "GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment":
    resource.getResourceComments,
  "DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment/[commentid]":
    resource.deleteComment,
  "DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]":
    resource.deleteResource,
  "PATCH:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]":
    resource.updateResource,
} satisfies RouteLookupType;
