import { getUserId } from "@/lib/auth-helper"
import { Category, Classroom, Resource, Section, User } from "@prisma/client"
import { SectionIncludeResources, db } from "../db"
import { notFound } from "next/navigation"
import { ServerFunctionError } from "@/lib/error"
import { prisma } from "@/lib/db"
import { useUserid } from "../client/auth"


// This is a list of function that dedupe any calls to db and cache them in one request

type classid = string
type categoryid = string
type sectionid = string
type resourceid = string

let cached: {

  user?: User,
  userClassrooms?:              Map<classid,    Classroom>
  selectedClassroomCategories?: Map<categoryid, Category>
  
  selectedCategoryData?:        Map<sectionid,  SectionIncludeResources>
  selectedCategoryResources?:   Map<resourceid, Resource>

} = {}

/**
 * THIS IS ONLY FOR PREFETCHING IN SERVER COMPONENTS.
 * DO NOT USER IN API HANDLER
 */
/**
 * This function retrieves user data from prisma and cache 
 * the data in a local variable
 * any subsequent call will use data from the static variable
 */

function throwNotFound(str: string): never {
  throw new ServerFunctionError(str)
}

export const prefetch = {

  //✅ This is for dashboard page
  user: {
    async data() {
      return cached.user
        ??= await db.getUser(await getUserId())
        ?? throwNotFound('User not Found')
    },
    async classroomlist() {
      if (cached.userClassrooms)
        return cached.userClassrooms
      
      const data = await db.getUserJoinedClassroomList(await getUserId())
      if(!data) throw new Error('User Not Found!')

      cached.user = data as User
      cached.userClassrooms = new Map(data.classes.map(cl => [cl.id, cl]))

      return cached.userClassrooms
    },
  },

  //✅ This is for classroom page
  classroom: {
    async data(classid: string) {
      return (await prefetch.user.classroomlist()).get(classid)
        ?? throwNotFound('Classroom not Found') // Todo: What happen if classroom not found?
    },
    async categorylist(classid: string) {
      // await prefetch.classroom.data(classid) // makes sure user allowed to see

      if (cached.selectedClassroomCategories)
        return cached.selectedClassroomCategories
      
      const data = await db.getUserClassroomCategories(await getUserId(), classid)
      if (!data)
        throw new Error('User Not Found!')
      if (!data.classes.some(c => c.id === classid))
        throw new Error('Classroom Not Found!')

      cached.user = data 
      cached.userClassrooms = new Map(data.classes.map(cl => [cl.id, cl]))
      cached.selectedClassroomCategories = new Map(data.classes.find(c => c.id === classid)?.categories.map(cat => [cat.id, cat]))

      return cached.selectedClassroomCategories
    },
  },

  //✅ This is for category page
  category: {

    async data(classid: string, categoryid: string) {
      return (await prefetch.classroom.categorylist(classid))?.get(categoryid)
        ?? throwNotFound('Category not Found')
    },
    async sectionsAndResources(classid: string, categoryid: string) {
      // await prefetch.category.data(classid, categoryid) // makes sure user allowed to see
      if (cached.selectedCategoryData)
        return cached.selectedCategoryData

      const data = await db.getUserClassroomCategoriesSectionsAndResourcse(await getUserId(), classid, categoryid)
      if (!data)
        throw new Error('User Not Found!')
      if (!data.classes.some(c => c.id === classid))
        throw new Error('Classroom Not Found!')
      if (!data.classes.find(c => c.id === classid)?.categories.some(c => c.id === categoryid))
        throw new Error('Category not Found!')
      
      const classroom = data.classes.find(c => c.id === classid)
      const category = classroom!.categories.find(c => c.id === categoryid)
      
      cached.user = data
      cached.userClassrooms = new Map(data.classes.map(cl => [cl.id, cl]))
      cached.selectedClassroomCategories = new Map(classroom!.categories.map(cat => [cat.id, cat]))
      cached.selectedCategoryData = new Map(category!.sections.map(se => [se.id, se]))

      const resmap = new Map<resourceid, Resource>()
      category!.sections.forEach(se => se.post.forEach( p => resmap.set(p.id, p)))
      cached.selectedCategoryResources = resmap
      
      return cached.selectedCategoryData
    }

  },


  //✅ This is for resources page (which is on top of a category page)
  resource: {
    data: async (classid: string, categoryid: string, resourceid: string) => {
      await prefetch.category.sectionsAndResources(classid, categoryid) // make sure data exists
      const cache = cached.selectedCategoryResources?.get(resourceid)
      return cache
    }
  }


}



