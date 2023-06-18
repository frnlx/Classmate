import { prisma } from "@/lib/db";
import { ServerFunctionError } from "@/lib/error";
import { Category, Classroom, Resource } from "@prisma/client";

// Semi-Pure DB Methods
// NO SIDE EFFECTS
// Prisma one and only
export const db = {
  // ✅ USER
  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
  // ✅ USER -> CLASSROOM[]
  async getUserJoinedClassroomList(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        memberClasses: true,
      },
    });
  },
  // ✅ USER -> CLASSROOM[] -> [] -> CATEGORIES []
  async getUserClassroomCategories(id: string, classid: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        memberClasses: {
          include: {
            classroom: {
              include: {
                categories: {
                  where: {
                    classroomId: classid,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
  // ✅ USER -> CLASSROOM[] -> [] -> CATEGORIES [] -> [] -> SECTIONS[] & RESOURCES[]
  async getUserClassroomCategoriesSectionsAndResourcse(
    id: string,
    classid: string,
    categories: string
  ) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        memberClasses: {
          include: {
            classroom: {
              include: {
                categories: {
                  where: {
                    classroomId: classid,
                  },
                  include: {
                    Resource: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  // Get all data required in user data
  async getUserClassroomData(id: string) {
    return await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        memberClasses: {
          include: {
            classroom: {
              include: {
                categories: {
                  include: {
                    Resource: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
};
