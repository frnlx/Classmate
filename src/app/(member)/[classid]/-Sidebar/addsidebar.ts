'use server'

import { prisma } from "@/lib/db"
import { color } from "@/lib/logger/chalk"
import { revalidatePath } from "next/cache"

export async function addCategory(classid:string) {
  await prisma.category.create({
    data: {
      name: Math.round(Math.random() * 100).toString(),
      title: 'Untitled Category using Server Action',
      classroomId: classid,
    }
  })
  color.yellow("Add Category")
  // revalidatePath('/[classid]')
}