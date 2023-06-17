import { Comment, ResourceType } from "@prisma/client"
import { Assignment, Category, Classroom, Discussion, Resource, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"


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
      }
    | {
        type: typeof ResourceType.DISCUSSION;
        Discussion: Discussion;
      }
    | {
        type: typeof ResourceType.NORMAL_POST;
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


// alt+shift+a " \(|=>"
// export const ClientAPI = {

// alt+shift+a requestFn\(||`/
export const ClientAPI = {

  getUser:                       requestFn(fetch<User>,                       `/api/users/[userid]`) // ✅
  , getClassroomList:            requestFn(fetch<Classroom[]>,                `/api/users/[userid]/classrooms`) // ✅
  , getClassroom:                requestFn(fetch<ClassroomWithOwner>,         `/api/users/[userid]/classrooms/[classid]`) // ✅
  , getClassroomMembers:         requestFn(fetch<User[]>,                     `/api/users/[userid]/classrooms/[classid]/members`) // ✅
  , getCategoryList:             requestFn(fetch<Category[]>,                 `/api/users/[userid]/classrooms/[classid]/categories`)  // ✅
  , getCategory:                 requestFn(fetch<Category>,                   `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)  // ✅
  , getResourceList:             requestFn(fetch<ResourcePopulated[]>,        `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources`)
  , getResource:                 requestFn(fetch<ResourcePopulated>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]`)
  , getComments:                 requestFn(fetch<CommentWithUser[]>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment`)

  // , createClassroom:             requestFn(create<Classroom>,        `/api/users/[userid]/classrooms`) // ✅
  , createCategory:              requestFn(create<Category>,         `/api/users/[userid]/classrooms/[classid]/categories`)
  , createResource:              requestFn(create<Resource>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)
  , createComment:               requestFn(create<Resource>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment`)

  , joinClassroom:               requestFn(join<Classroom>,          `/api/users/[userid]/classrooms/[classid]`) // ✅

  , updateUser:                  requestFn(update<User>,             `/api/users/[userid]`)
  , updateClassroom:             requestFn(update<Classroom>,        `/api/users/[userid]/classrooms/[classid]`) // ✅
  , updateCategory:              requestFn(update<Category>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)
  , updateResource:              requestFn(update<Resource>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]/resources/[resid]`)

  , deleteClassroom:             requestFn(remove<Classroom[]>,      `/api/users/[userid]/classrooms/[classid]`) // ✅
  , deleteCategory:              requestFn(remove<Category[]>,       `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)
  , deleteResource:              requestFn(remove<MessageResponse>,  `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]`)
  , deleteComment:               requestFn(remove<MessageResponse>,  `/api/users/[userid]/classrooms/[classid]/categories/[catid]/resources/[resid]/comment/[commentid]`)
  , leaveClassroom:              requestFn(remove<Classroom>,        `/api/users/[userid]/classrooms/[classid]/leave`) // ✅

} satisfies ClientAPISimple












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



