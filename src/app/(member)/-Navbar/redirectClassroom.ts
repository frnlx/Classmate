'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function gotoClassroom(routeid:string) {
  // revalidatePath('/[classid]')
  // redirect(`/${routeid}`)
}