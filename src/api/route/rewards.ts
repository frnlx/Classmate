import { HandlerLookup, RouteLookupType } from "@/lib/route";
import { membersOnly } from "../utils";
import { prisma } from "@/lib/db";
import { RewardFormSchema } from "@/components/classroom/rewards/RewardForm";

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
} satisfies HandlerLookup;

export const rewardRoutes = {
  "GET:/class/[classid]/rewards": category.getClassRewards,
  "POST:/class/[classid]/rewards": category.createReward,
  "GET:/class/[classid]/rewards/[rewardsid]": category.getData,
  "PATCH:/class/[classid]/rewards/[rewardsid]": category.updateReward,
  "DELETE:/class/[classid]/rewards/[rewardsid]": category.deleteReward,
} satisfies RouteLookupType;
