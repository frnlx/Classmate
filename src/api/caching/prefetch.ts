import { getUserId } from "@/lib/auth-helper"
import { Category, Classroom, Resource, User } from "@prisma/client"
import { SectionIncludeResources, db } from "../db"


// This is a list of function that dedupe any calls to db and cache them in one request

// Remember:
// - only prefetch data that are required on a page
// - do not create unnecessary functions
type classid = string
type categoryid = string
type sectionid = string
type resourceid = string

const cached: {

  user?: User,
  userClassrooms?: Map<classid, Classroom>
  selectedClassroomCategories?: Map<categoryid, Category>
  selectedCategoryData?: Map<sectionid, SectionIncludeResources>
  selectedCategoryResources?: Map<resourceid, Resource>

} = {}

/**
 * This function retrieves user data from prisma and cache 
 * the data in a local variable
 * any subsequent call will use data from the static variable
 */

export const prefetch = {

  // Any datas related to user
  user: {

    // Does not include relational info
    data: async () => {
      return cached.user ??= await db.getUser(await getUserId())
    },
    joinedclassrooms: async () => {
      return cached.userClassrooms ??= await db.getUserJoinedClassroom(await getUserId())
    },

  },



  // Any datas related to user's joined classroom
  classroom: {

    data: async (classid: string) => {
      const cache = (await prefetch.user.joinedclassrooms()).get(classid)
      return cache ?? null
    },
    categories: async (classid: string) => {
      if (await prefetch.classroom.data(classid) === null) return null
      return cached.selectedClassroomCategories ??= await db.getClassroomCategories(classid)
    },

  },



  // Any datas related to currently opened category page
  category: {

    data: async (classid: string, categoryid: string) => {
      const cache = (await prefetch.classroom.categories(classid))?.get(categoryid)
      return cache ?? null
    },
    sections: async (classid: string, categoryid: string) => {
      if (await prefetch.category.data(classid, categoryid) === null) return null
      if (!cached.selectedCategoryData)
        ({ map: cached.selectedCategoryData, resourcemap: cached.selectedCategoryResources } = await db.getCategorySectionsAndResources(categoryid))
      return cached.selectedCategoryData
    }

  },



  resource: {

    data: async (classid: string, categoryid: string, resourceid: string) => {
      const cache = (await prefetch.category.sections(classid, categoryid))?.get(resourceid)
      return cache ?? null
    }

  }
}



