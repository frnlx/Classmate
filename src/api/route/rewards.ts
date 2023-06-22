import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { RewardFormSchema } from "@/components/classroom/rewards/RewardForm";
import { notFound } from "../responses";

const category = {
  // ✅ Idempotent // ❌ Untested
  async getData(_, res, [cid, rid]) {
    await membersOnly();
    const data = await prisma.reward.findUniqueOrThrow({
      where: { id: rid },
    });
    return res.json(data);
  },

  async getClassRewards(_, res, [cid]) {
    await membersOnly();
    const data = await prisma.reward.findMany({
      where: { classroomId: cid },
    });
    return res.json(data);
  },

  // ✅ Idempotent // ❌ Untested
  async createReward(_, res, [cid], body: RewardFormSchema) {
    await membersOnly();
    const reward = await prisma.reward.create({
      data: {
        name: body.name,
        pointCost: body.cost,
        classroom: { connect: { id: cid } },
      },
    });
    return res.json(reward);
  },

  async updateReward(_, res, [cid, rid], body: RewardFormSchema) {
    await membersOnly();
    const updatedReward = await prisma.reward.update({
      where: { id: rid },
      data: {
        name: body.name,
        pointCost: body.cost,
      },
    });
    return res.json(updatedReward);
  },

  async deleteReward(_, res, [cid, rid]) {
    await membersOnly();
    await prisma.reward.delete({
      where: { id: rid },
    });
    return res.ok();
  },

  async createMemberReward(
    _,
    res,
    [cid, rid],
    body: {
      note: string;
    }
  ) {
    const session = await membersOnly();
    const userId = session.user.id;
    const member = await prisma.member.findUnique({
      where: {
        userId_classroomId: {
          classroomId: cid,
          userId: userId,
        },
      },
    });

    if (!member) notFound();
    const reward = await prisma.reward.findUnique({
      where: { id: rid },
      select: { name: true, pointCost: true },
    });
    if (!reward) notFound();

    await prisma.member.update({
      where: { id: member.id },
      data: {
        points: { decrement: reward.pointCost },
      },
    });
    const memberReward = await prisma.memberReward.create({
      data: {
        note: body.note,
        name: reward.name,
        member: { connect: { id: member.id } },
        classroom: { connect: { id: cid } },
      },
    });
    return res.json(memberReward);
  },

  async claimMemberReward(_, res, [cid, mrid]) {
    await membersOnly();
    const updatedMemberReward = await prisma.memberReward.update({
      where: {
        id: mrid,
      },
      data: {
        redeemed: true,
      },
    });
    return res.json(updatedMemberReward);
  },
} satisfies HandlerLookup;

export const rewardRoutes = {
  "GET:/class/[classid]/rewards": category.getClassRewards,
  "POST:/class/[classid]/rewards": category.createReward,
  "GET:/class/[classid]/rewards/[rewardsid]": category.getData,
  "PATCH:/class/[classid]/rewards/[rewardsid]": category.updateReward,
  "DELETE:/class/[classid]/rewards/[rewardsid]": category.deleteReward,
  "POST:/class/[classid]/rewards/[rewardsid]/redeem":
    category.createMemberReward,
  "PATCH:/class/[classid]/redeem/[memberrewardid]": category.claimMemberReward,
} satisfies RouteLookupType;
