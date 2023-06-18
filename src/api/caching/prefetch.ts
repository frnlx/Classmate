import { getUserId } from "@/lib/auth";
import { Category, Classroom, Member, Resource, User } from "@prisma/client";
import { db } from "../db";
import { notFound } from "next/navigation";
import { ServerFunctionError } from "@/lib/error";
import { prisma } from "@/lib/db";
import { useUserid } from "../client/auth";
import { color } from "@/lib/logger/chalk";

// This is a list of function that dedupe any calls to db and cache them in one request

type classid = string;
type categoryid = string;
type sectionid = string;
type resourceid = string;

let cached: {
  firstCall?: boolean;
  user?: User;

  userClassrooms?: Map<classid, Member>;

  userClassroomsCategories: Map<classid, Map<categoryid, Category>>;

  // userClassroomsCategoriesContent: Map<classid, Map<categoryid, SectionIncludeResources>>

  // selectedClassroomCategories?: Map<categoryid, Category>

  // selectedCategoryData?:        Map<sectionid,  SectionIncludeResources>
  // selectedCategoryResources?:   Map<resourceid, Resource>
} = {
  userClassroomsCategories: new Map(),
};

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
  throw new Error("NotFound | " + str);
}

function isCalledFirstOrSecond() {
  if (!cached.firstCall) {
    cached.firstCall = true;
    color.cyan(" --> !! First Call !!");
    console.log(Object.keys(cached));
  } else {
    color.cyan(" !! Second Call !!");
    console.log(Object.keys(cached));
  }
}

export const prefetch = {
  //✅ This is for dashboard page
  user: {
    async data() {
      isCalledFirstOrSecond();
      return (cached.user ??=
        (await db.getUser(await getUserId())) ??
        throwNotFound("User not Found"));
    },
    async classroomlist() {
      isCalledFirstOrSecond();
      if (cached.userClassrooms) return cached.userClassrooms;

      color.yellow("Fetching Classroom List...");

      const data = await db.getUserJoinedClassroomList(await getUserId());
      if (!data) throw new Error("User Not Found!");

      cached.user = data as User;
      cached.userClassrooms = new Map(
        data.memberClasses.map((cl) => [cl.id, cl])
      );

      return cached.userClassrooms;
    },
  },

  //✅ This is for classroom page
  classroom: {
    async data(classid: string) {
      isCalledFirstOrSecond();
      return (
        (await prefetch.user.classroomlist()).get(classid) ??
        throwNotFound("Classroom not Found")
      ); // Todo: What happen if classroom not found?
    },
    async categorylist(classid: string) {
      isCalledFirstOrSecond();

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // await prefetch.classroom.data(classid) // makes sure user allowed to see
      // console.log("Get Category List")

      if (cached.userClassroomsCategories?.get(classid))
        return cached.userClassroomsCategories?.get(classid);

      color.yellow(
        "Fetching Category List of ... and Classroom List... and User Data..."
      );
      // console.log("No Cached Category List.. Fetching")

      const data = await db.getUserClassroomCategories(
        await getUserId(),
        classid
      );
      if (!data) throw new Error("User Not Found!");
      if (!data.memberClasses.some((c) => c.id === classid))
        throw new Error("Classroom Not Found!");

      // console.log("Data" + JSON.stringify(data, null, 2))
      // const mymap = new Map(data.classes.map(cl => [cl.id, cl]))
      // console.log("Data")
      // mymap.forEach((val, key)=> console.log(key, val))

      cached.user = data;
      cached.userClassrooms = new Map(
        data.memberClasses.map((cl) => [cl.id, cl])
      );
      cached.userClassroomsCategories.set(
        classid,
        new Map(
          data.memberClasses
            .find((c) => c.id === classid)
            ?.classroom.categories.map((cat) => [cat.id, cat])
        )
      );

      return cached.userClassroomsCategories.get(classid);
    },
  },

  //✅ This is for category page
  // category: {

  //   async data(classid: string, categoryid: string) {
  //     isCalledFirstOrSecond()
  //     const val = await prefetch.classroom.categorylist(classid)
  //     // console.log("Val" + val.get(categoryid))
  //     // color.magenta("categoryData")

  //     return (await prefetch.classroom.categorylist(classid))?.get(categoryid)
  //       ?? throwNotFound('Category not Found')
  //   },
  //   async sectionsAndResources(classid: string, categoryid: string) {
  //     isCalledFirstOrSecond()
  //     // await prefetch.category.data(classid, categoryid) // makes sure user allowed to see

  //     // if (cached.selectedCategoryData) {
  //     //   color.yellow('Cached Found...')
  //     //   return cached.selectedCategoryData
  //     // }

  //     color.magenta("Fetching sectionsAndResources: "+categoryid)

  //     const data = await db.getUserClassroomCategoriesSectionsAndResourcse(await getUserId(), classid, categoryid)
  //     if (!data)
  //       throw new Error('User Not Found!')
  //     if (!data.classes.some(c => c.id === classid))
  //       throw new Error('Classroom Not Found!')
  //     if (!data.classes.find(c => c.id === classid)?.categories.some(c => c.id === categoryid))
  //       throw new Error('Category not Found!')

  //     const classroom = data.classes.find(c => c.id === classid)
  //     const category = classroom!.categories.find(c => c.id === categoryid)

  //     cached.user = data
  //     cached.userClassrooms = new Map(data.classes.map(cl => [cl.id, cl]))
  //     cached.selectedClassroomCategories = new Map(classroom!.categories.map(cat => [cat.id, cat]))
  //     cached.selectedCategoryData = new Map(category!.sections.map(se => [se.id, se]))

  //     const resmap = new Map<resourceid, Resource>()
  //     category!.sections.forEach(se => se.post.forEach( p => resmap.set(p.id, p)))
  //     cached.selectedCategoryResources = resmap

  //     return cached.selectedCategoryData
  //   }
  // },

  //✅ This is for resources page (which is on top of a category page)
  // resource: {
  //   data: async (classid: string, categoryid: string, resourceid: string) => {
  //     isCalledFirstOrSecond()
  //     await prefetch.category.sectionsAndResources(classid, categoryid) // make sure data exists
  //     const cache = cached.selectedCategoryResources?.get(resourceid)
  //     return cache
  //   }
  // }
};
