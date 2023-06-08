import { Category, Classroom, Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"


type ClientAPISimple = {
  [model: string]: ( params: any ) => any
}

type SectionsIncldPost = (Section & { post: Resource[] })[]

// alt+shift+a " \(|=>"
// export const ClientAPI = {

//     getUser:                     (userid)                                => fetch<User>              (`/api/users/${userid}`)
//   , getClassroomList:            (userid)                                => fetch<Classroom[]>       (`/api/users/${userid}/classrooms`)
//   , getClassroom:                (userid, classid)                       => fetch<Classroom>         (`/api/users/${userid}/classrooms/${classid}`)
//   , getCategoryList:             (userid, classid)                       => fetch<Category[]>        (`/api/users/${userid}/classrooms/${classid}/categories`)
//   , getCategory:                 (userid, classid, catid)                => fetch<Category>          (`/api/users/${userid}/classrooms/${classid}/categories/${catid}`)
//   , getSectionList:              (userid, classid, catid)                => fetch<Section[]>         (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections`)
//   , getSectionListInclResources: (userid, classid, catid)                => fetch<SectionsIncldPost> (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/resources`)
//   , getResourceList:             (userid, classid, catid, sectid)        => fetch<Resource[]>        (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}/resources`)
//   , getResource:                 (userid, classid, catid, sectid, resid) => fetch<Resource>          (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}/resources/${resid}`)

//   , createClassroom:             (userid)                                => create<Classroom>        (`/api/users/${userid}/classrooms`)
//   , createCategory:              (userid, classid)                       => create<Category>         (`/api/users/${userid}/classrooms/${classid}/categories`)
//   , createSection:               (userid, classid, catid)                => create<Section>          (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections`)
//   , createResource:              (userid, classid, catid, sectid)        => create<Resource>         (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}`)

//   , joinClassroom:               (userid, classid)                       => join<Classroom>          (`/api/users/${userid}/classrooms/${classid}`)

//   , updateUser:                  (userid)                                => update<User>             (`/api/users/${userid}`)
//   , updateClassroom:             (userid, classid)                       => update<Classroom>        (`/api/users/${userid}/classrooms/${classid}`)
//   , updateCategory:              (userid, classid, catid)                => update<Category>         (`/api/users/${userid}/classrooms/${classid}/categories/${catid}`)
//   , updateSection:               (userid, classid, catid, sectid)        => update<Section>          (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}`)
//   , updateResource:              (userid, classid, catid, sectid, resid) => update<Resource>         (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}/resources/${resid}`)

//   , deleteClassroom:             (userid, classid)                       => remove<Classroom[]>      (`/api/users/${userid}/classrooms/${classid}`)
//   , deleteCategory:              (userid, classid, catid)                => remove<Category[]>       (`/api/users/${userid}/classrooms/${classid}/categories/${catid}`)
//   , deleteSection:               (userid, classid, catid, sectid)        => remove<Section[]>        (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}`)
//   , deleteResource:              (userid, classid, catid, sectid, resid) => remove<Resource[]>       (`/api/users/${userid}/classrooms/${classid}/categories/${catid}/sections/${sectid}/resources/${resid}`)

// } satisfies ClientAPISimple

// alt+shift+a requestFn\(||`/
export const ClientAPI = {

  getUser:                       requestFn(fetch<User>,              `/api/users/[userid]`) // ✅
  , getClassroomList:            requestFn(fetch<Classroom[]>,       `/api/users/[userid]/classrooms`) // ✅
  , getClassroom:                requestFn(fetch<Classroom>,         `/api/users/[userid]/classrooms/[classid]`) // ✅
  , getCategoryList:             requestFn(fetch<Category[]>,        `/api/users/[userid]/classrooms/[classid]/categories`)  // ✅
  , getCategory:                 requestFn(fetch<Category>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)  // ✅
  , getSectionList:              requestFn(fetch<Section[]>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections`)
  , getSectionListInclResources: requestFn(fetch<SectionsIncldPost>, `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/resources`)
  , getResourceList:             requestFn(fetch<Resource[]>,        `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]/resources`)
  , getResource:                 requestFn(fetch<Resource>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]/resources/[resid]`)

  , createClassroom:             requestFn(create<Classroom>,        `/api/users/[userid]/classrooms`) // ✅
  , createCategory:              requestFn(create<Category>,         `/api/users/[userid]/classrooms/[classid]/categories`)
  , createSection:               requestFn(create<Section>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections`)
  , createResource:              requestFn(create<Resource>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]`)

  , joinClassroom:               requestFn(join<Classroom>,          `/api/users/[userid]/classrooms/[classid]`) // ✅

  , updateUser:                  requestFn(update<User>,             `/api/users/[userid]`)
  , updateClassroom:             requestFn(update<Classroom>,        `/api/users/[userid]/classrooms/[classid]`)
  , updateCategory:              requestFn(update<Category>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)
  , updateSection:               requestFn(update<Section>,          `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]`)
  , updateResource:              requestFn(update<Resource>,         `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]/resources/[resid]`)

  , deleteClassroom:             requestFn(remove<Classroom[]>,      `/api/users/[userid]/classrooms/[classid]`)
  , deleteCategory:              requestFn(remove<Category[]>,       `/api/users/[userid]/classrooms/[classid]/categories/[catid]`)
  , deleteSection:               requestFn(remove<Section[]>,        `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]`)
  , deleteResource:              requestFn(remove<Resource[]>,       `/api/users/[userid]/classrooms/[classid]/categories/[catid]/sections/[sectid]/resources/[resid]`)

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
    console.warn("AXIOS request")
    return config
  },
  (error) => {
    console.warn("AXIOS request error")
    return Promise.reject(error)
  }
)

// const customaxios = axios.create()
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.warn("AXIOS response")
  
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



