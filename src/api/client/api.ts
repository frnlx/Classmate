import { Comment, ResourceType } from "@prisma/client"
import { Assignment, Category, Classroom, Discussion, Resource, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import { routes } from "../routes"
import { NextResponse } from "next/server"

type ClientAPISimple = {
  [model: string]: ( params: any ) => any
}

export type ClassroomWithOwner = Classroom & {owner: User}
export type ResourcePopulated = Resource & {
  _count: {
    Comment: number;
  };
} & (
    | {
        type: typeof ResourceType.ASSIGNMENT;
        Assignment: Assignment;
        Discussion: undefined;
      }
    | {
        type: typeof ResourceType.DISCUSSION;
        Assignment: undefined;
        Discussion: Discussion;
      }
    | {
        type: typeof ResourceType.NORMAL_POST;
        Assignment: undefined;
        Discussion: undefined;
      }
  );

export type ResourcePopulatedWithUser = ResourcePopulated & {
  user: User;
};

export type CommentWithUser = Comment & {
  user: User
}

export type ResourcePopulatedWithUserComment = ResourcePopulatedWithUser & {
  Comment: CommentWithUser[]
}

export type MessageResponse = {
  message: string
}

export type IdResponse<T> = {
  id: T
}

export type method =
  | "GET"
  | "POST"
  | "PATCH"
  | "DELETE"
  | "PUT"

// alt+shift+a " \(|=>"
// export const ClientAPI = {

// alt+shift+a requestFn\(||`/
export const ClientAPI = {

  getUser:                       anotherLayer("GET:/users/[userid]") // ✅
  , getClassroomList:            anotherLayer("GET:/users/[userid]/classrooms") // ✅
  , getClassroom:                anotherLayer("GET:/users/[userid]/classrooms/[classid]") // ✅
  , getClassroomMembers:         anotherLayer("GET:/users/[userid]/classrooms/[classid]/members") // ✅
  , getCategoryList:             anotherLayer("GET:/users/[userid]/classrooms/[classid]/categories")  // ✅
  , getCategory:                 anotherLayer("GET:/users/[userid]/classrooms/[classid]/categories/[catid]")  // ✅
  , getResourceList:             anotherLayer("GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources")
  , getResource:                 anotherLayer("GET:/users/[userid]/classrooms/[classid]/categories/[categoryid]/resources/[resourceid]")
  , getComments:                 anotherLayer("GET:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment")
  , getClassRewards:             anotherLayer("GET:/class/[classid]/rewards")
  , getReward:                   anotherLayer("GET:/class/[classid]/rewards/[rewardsid]")

  // , createClassroom:             requestFn(create<Classroom>,        `/api/users/[userid]/classrooms`) // ✅
  , createAttachment:            anotherLayer(`POST:/users/[userid]/attachment`)
  , createCategory:              anotherLayer(`POST:/users/[userid]/classrooms/[classid]/categories`)
  , createResource:              anotherLayer(`POST:/users/[userid]/classrooms/[classid]/categories/[categoryid]`)
  , createComment:               anotherLayer(`POST:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment`)
  , createSubmission:            anotherLayer(`POST:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/submit`)
  , gradeSubmission:             anotherLayer(`POST:/submission/[submissionid]/grade`)
  , createReward:                anotherLayer(`POST:/class/[classid]/rewards`)
  , createMemberReward:          anotherLayer(`POST:/class/[classid]/rewards/[rewardsid]/redeem`)

  , joinClassroom:               anotherLayer(`PUT:/users/[userid]/classrooms/[classid]`) // ✅

  , updateUser:                  anotherLayer("PATCH:/users/[userid]")
  , updateClassroom:             anotherLayer("PATCH:/users/[userid]/classrooms/[classid]") // ✅
  , updateCategory:              anotherLayer("PATCH:/users/[userid]/classrooms/[classid]/categories/[catid]")
  , updateResource:              anotherLayer("PATCH:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]")
  , updateReward:                anotherLayer("PATCH:/class/[classid]/rewards/[rewardsid]")
  , claimReward:                 anotherLayer("PATCH:/class/[classid]/redeem/[memberrewardid]")

  , deleteClassroom:             anotherLayer("DELETE:/users/[userid]/classrooms/[classid]") // ✅
  , deleteCategory:              anotherLayer("DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]")
  , deleteResource:              anotherLayer("DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]")
  , deleteComment:               anotherLayer("DELETE:/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment/[commentid]")
  , deleteReward:                anotherLayer("DELETE:/class/[classid]/rewards/[rewardsid]")
  , leaveClassroom:              anotherLayer("DELETE:/users/[userid]/classrooms/[classid]/leave") // ✅

} satisfies ClientAPISimple

type AllRoutes = keyof typeof routes
type ExtractMethod<Routing extends AllRoutes> =
  Routing extends `${infer RequestMethod & method}:${infer RouteUrl}`
  ? [RequestMethod, RouteUrl]
  : never

interface RequestFunctionSig<T> {
  "GET": Promise<T>,
  "DELETE": Promise<T>
  "POST": {
    with: (data: Object) => Promise<T>;
  }
  "PATCH": {
    with: (data: Object) => Promise<T>;
  }
  "PUT": Promise<T>
}

type ExtractResponse<T extends (...args: any) => any> = ReturnType<T> extends Promise<NextResponse<infer U>> ? U : never;
function anotherLayer<Route extends AllRoutes>(route: Route): ReturnType<typeof requestFn<RequestFunctionSig<ExtractResponse<(typeof routes)[Route]>>[ExtractMethod<Route>[0]], ExtractMethod<Route>[1]>> {
  const [method, url] = route.split(":") as ExtractMethod<Route>
  if (method === "GET") {
    // @ts-ignore
    return requestFn(fetch<ExtractResponse<(typeof routes)[Route]>>, `/api${url}`)
  } else if (method === "POST") {
    // @ts-ignore
    return requestFn(create<(typeof routes)[Route]>, `/api${url}`)
  }else if (method === "PATCH") {
    // @ts-ignore
    return requestFn(update<(typeof routes)[Route]>, `/api${url}`)
  } else if (method === "DELETE") {
    // @ts-ignore
    return requestFn(remove<(typeof routes)[Route]>, `/api${url}`)
  } else {
    // @ts-ignore
    return requestFn(join<(typeof routes)[Route]>, `/api${url}`)
  } 
}








// ----------------------------------------------
// Helper Util
// ----------------------------------------------

type SplitPath<Path extends string> = 
  Path extends `${infer First}/${infer Second}`
  ? First | SplitPath<Second>
  : Path

type IgnoreNonDynamic<Subpath extends string> =
  Subpath extends `[${infer ParamName}]`
  ? ParamName
  : never

type ExtractParam<Path extends string> = IgnoreNonDynamic<SplitPath<Path>>

function requestFn<ReturnValue, RouteUrl extends string = string>(fn: (url: string)=>ReturnValue, route: RouteUrl) {
  return (params: { [key in ExtractParam<RouteUrl>]: string }): ReturnValue => {
    let url = route as string
    Object
      .entries<string>(params)
      .forEach(([param, value]) => {
        url = url.replace(new RegExp(`(\\[${param}\\])`), value)
      })
    return fn(url)
  }
}

// Example
// (async () => {
//   // declaring
//   const e = requestFn(fetch<User>, `/api/users/:userid`);
//   // consuming
//   const f = await e({ userid: 'asdff' })

//   // declaring
//   const g = requestFn(update<User>, `/api/users/:userid`);
//   // consuming
//   const h = g({ userid: 'asdff' }).with({name: 'yes'})
// })()



axios.interceptors.request.use(
  (config) => {
    // console.warn("AXIOS request")
    return config
  },
  (error) => {
    // console.warn("AXIOS request error")
    return Promise.reject(error)
  }
)

// const customaxios = axios.create()
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.warn("AXIOS response")
  
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
});


// Indicates a fetcher must return data
function mustReturnData<ReturnType>(p: AxiosResponse<ReturnType, any>) {
  if (p.data === undefined) throw new Error('Client Fetch Method must return a data!')
  return p.data as ReturnType
}

// Indicates a fetcher requires "data" object
type withData<T> = { with(data: object): Promise<T> }

// Fetcher function types
async function fetch<ReturnType>(url: string) {
  return mustReturnData(await axios.get<ReturnType>(url))
}
async function remove<ReturnType>(url: string) {
  return mustReturnData(await axios.delete<ReturnType>(url))
}
async function join<ReturnType>(url: string) {
  return mustReturnData(await axios.put<ReturnType>(url))
}

function update<ReturnType>(url: string) {
  return { with: async (data: object) => mustReturnData(await axios.patch<ReturnType>(url, data)) } satisfies withData<ReturnType>
}

function replace<ReturnType>(url: string) {
  return { with: async (data: object) => mustReturnData(await axios.put<ReturnType>(url, data)) } satisfies withData<ReturnType>
}

function create<ReturnType>(url: string) {
  return { with: async (data: Object) => mustReturnData(await axios.post<ReturnType>(url, data)) } satisfies withData<ReturnType>
}



