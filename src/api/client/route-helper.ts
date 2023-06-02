import { CategoryData, ClassroomData, SectionData, UserData } from "@/types/fetchmodels"
import { Category, Classroom, Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"


/**
 * 
 */

type s = string
type p<T> = Partial<T>

type modelMethod = {
  get?(...params: string[]): Promise<any>
  getAll?(...params: string[]): Promise<any[]>
  join?(...params: string[]): Promise<any>
  delete?(...params: string[]): Promise<any>
  update?(data: any, ...params: string[]): Promise<any>
  create?(data: any, ...params: string[]): Promise<any>
  [model: string]:
  | ((...params: any[]) => Promise<any>)
  | ((...params: string[]) => any)
  | modelMethod
  | undefined
}

type ClientAPILookup = {
  [model: string]: (params: string) => modelMethod
}

type ClientAPISimple = {
  [model: string]:
  | ((...params: string[]) => any)
  | undefined
}


export const ClientAP2 = {

    getUser                       : (userid)                      => fetch(`/api/users/${userid}`)
  , getClassroomList              : (userid)                      => fetch(`/api/user/${userid}/classrooms`)
  , getClassroom                  : (userid, classid)             => fetch(`/api/user/${userid}/classroom/${classid}`)
  , getCategoryList               : (userid, classid)             => fetch(`/api/user/${userid}/classroom/${classid}/categories`)
  , getCategory                   : (userid, classid, categoryid) => fetch(`/api/user/${userid}/classroom/${classid}/categories/${categoryid}`)
  , getSectionList                : (userid, classid, categoryid) => fetch(`/api/user/${userid}/ classroom/${classid}/categories/${categoryid}/sections`)
  , getSectionListIncludeResources: (userid, classid, categoryid) => fetch(`/api/user/${userid}/ classroom/${classid}/categories/${categoryid}/sections/resources`)

  , updateUser: (userid) => update(`/api/users/$P{}`)


  , updateUser: (userid) => update(`/api/users/${userid}`),


} satisfies ClientAPISimple



export const ClientAPI = {

  getuser: (userid) => fetch(``),


  // Parameters are string by default
  user: (userid) => {
    const route_user = `/api/users/${userid}`
    const route_classrooms = `/api/users/${userid}/classrooms`
    return {
      get() {
        return fetch(route_user) as Promise<User>
      },
      update(data: p<User>) {
        return update(route_user, data) as Promise<User>
      },
      classrooms: {
        get() {
          return fetch(route_classrooms) as Promise<Classroom[]>
        },
        create() {
          return create(route_classrooms) as Promise<Classroom>
        },
      },
      classroom(classid: string) {
        const route_classroom = route_classrooms + `/${classid}`
        const route_categories = route_classroom + `/${classid}/categories`
        return {
          get() {
            return fetch(route_classroom) as Promise<Classroom>
          },
          join() {
            return join(route_classroom) as Promise<Classroom>
          },
          categories: {
            get() {
              return fetch(route_categories) as Promise<Category[]>
            },
            create() {
              return create(route_categories) as Promise<Category>
            }
          },
          category(categoryid: string) {
            const route_category = route_categories + `/${categoryid}`
            return {
              get() {
                return fetch(route_category) as Promise<Category>
              },
              delete() {
                return remove(route_category) as Promise<Category[]>
              }

            } satisfies modelMethod
          }

        } satisfies modelMethod
      },


    }
  },

  // userclassrooms: {
  // getAll(userid) {
  //   return fetch(`/api/users/${userid}/classrooms`) as Promise<Classroom[]>
  // },
  // create(data, userid) {
  //   return create(`/api/users/${userid}/classrooms`, data) as Promise<Classroom>
  // },
  // join(userid, classid) {
  //   // CHANGE TO  -> `PUT/join /api/users/${userid}/classrooms/${classid}`
  //   return join(`/api/users/${userid}/classrooms/${classid}}`) as Promise<Classroom>
  // },
  // },

  // classroom: {
  // get(classid) {
  //   return fetch(`/api/classrooms/${classid}`) as Promise<Classroom>
  // },
  // use(classid) {
  // const prefix = `/api/classrooms/${classid}`
  // return {
  // category: {
  // getAll() {
  //   return fetch(`${prefix}/categories`) as Promise<Category[]>
  // },
  // create(data) {
  //   return create(`${prefix}/categories`) as Promise<Category>
  // },
  // get(categoryid) {
  //   return fetch(`${prefix}/categories/${categoryid}`) as Promise<Category>
  // },
  // delete(categoryid) {
  //   return remove(`${prefix}/categories/${categoryid}`) as Promise<Category>
  // }
  // }
  // }
  // }
  // },

  // classroomcategories: {
  //   getAll(classid) {
  //     return fetch(`/api/classrooms/${classid}/categories`) as Promise<Category[]>
  //   },
  //   create(data, classid) {
  //     return create(`/api/classrooms/${classid}/categories`) as Promise<Category>
  //   },
  //   get(classid, categoryid) {
  //     return fetch(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Category>
  //   },
  //   delete(classid, categoryid, sectionid) {
  //     return remove(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Category>
  //   }
  // },

  classroomcategorysections: {
    getAll(classid, categoryid) {
      return fetch(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Section[]>
    },
    create(data, classid, categoryid) {
      return create(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Section>
    },
    get(classid, categoryid, sectionid) {
      return fetch(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`) as Promise<Section>
    },
    delete(classid, categoryid, sectionid) {
      return remove(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`) as Promise<Section>
    }
  }

}

ClientAPI.user('').classroom('').category('').get

export const UserAPI = {
  GetUserOwnedClassrooms: (userid: s) => GET<ClassroomData[]>(`/api/users/${userid}/owned-classrooms`),
}

export const ClassAPI = {
  GetClassInvites: (classid: s) => GET<ClassroomData>(`/api/classrooms/${classid}/invites`),
  CreateClassInvite: (classid: s) => POST<ClassroomData>(`/api/classrooms/${classid}/invites`),

  // Sections
  // GetCategorySections: (classid: s, categoryid: s) => GET<SectionData[]>(`/api/classrooms/${classid}/categories/${categoryid}`),
  // CreateSection: (classid: s, categoryid: s) => POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}`),
  // GetSection: (classid: s, categoryid: s, sectionid: s) => POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),
  // DeleteSection: (classid: s, categoryid: s, sectionid: s) => DELETE<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),

  // Resources
  GetSectionResources: (classid: s, categoryid: s, sectionid: s) => GET<Resource[]>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`),
  CreateResource: (classid: s, categoryid: s, sectionid: s, data: any) => POST<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`, data),
  GetResource: (classid: s, categoryid: s, sectionid: s, resourceid: s) => GET<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
  DeleteResource: (classid: s, categoryid: s, sectionid: s, resourceid: s) => DELETE<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
}


function mustReturnData<ReturnType>(p: AxiosResponse<ReturnType, any>) {
  if (p.data === undefined) throw new Error('Client Fetch Method must return a data!')
  return p.data as ReturnType
}


async function fetch<ReturnType>(url: string) {
  return mustReturnData(await axios.get<ReturnType>(url))
}
async function remove<ReturnType>(url: string) {
  return mustReturnData(await axios.delete<ReturnType>(url))
}
async function join<ReturnType>(url: string) {
  return mustReturnData(await axios.put<ReturnType>(url))
}

// with data
type withData<T> = {
  with(data: object): Promise<T>
}


function update<ReturnType>(url: string) {
  return {
    async with(data: object) {
      return mustReturnData(await axios.patch<ReturnType>(url, data))
    }
  } satisfies withData<ReturnType>
}

function replace<ReturnType>(url: string) {
  return {
    async with(data: object) {
      return mustReturnData(await axios.put<ReturnType>(url, data))
    }
  } satisfies withData<ReturnType>
}

function create<ReturnType>(url: string) {
  return {
    async with(data: Object) {
      return mustReturnData(await axios.post<ReturnType>(url, data))
    }
  } satisfies withData<ReturnType>

}





export const GET = axios.get
export const POST = axios.post
export const PUT = axios.put
export const PATCH = axios.patch
export const HEAD = axios.head
export const DELETE = axios.delete