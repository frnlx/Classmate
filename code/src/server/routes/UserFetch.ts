import { prisma } from "../config/dbConfig"

export const fetchUser = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        classes:true
      }
    })
  } catch (error) {
    console.log(error)
  }
}