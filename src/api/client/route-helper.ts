import { CategoryData, ClassroomData, SectionData, UserData } from "@/types/fetchmodels"
import { Category, Classroom, Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"

type s = string
type p<T> = Partial<T>

type modelMethod = {
  get?(...params: string[]): Promise<any>
  getAll?(...params: string[]): Promise<any[]>
  update?(data: any, ...params: string[]): Promise<any>
  join?(...params: string[]): Promise<any>
  create?(data: any, ...params: string[]): Promise<any>
  delete?(...params: string[]): Promise<any>
  [model: string | symbol]: (...params: string[]) => modelMethod
}

type ClientAPILookup = {
  [model: symbol]: (...params: string[]) => modelMethod
}

export const ClientAPI = {

  // Parameters are string by default
  user: (userid) => {
    const userroute = `/api/users/${userid}`
    return {
      get() {
        return fetch(userroute) as Promise<User>
      },
      update(data: p<User>) {
        return update(userroute, data) as Promise<User>
      },
    }
  },

  userclassrooms: {
    getAll(userid) {
      return fetch(`/api/users/${userid}/classrooms`) as Promise<Classroom[]>
    },
    create(data, userid) {
      return create(`/api/users/${userid}/classrooms`, data) as Promise<Classroom>
    },
    join(userid, classid) {
      // CHANGE TO  -> `PUT/join /api/users/${userid}/classrooms/${classid}`
      return join(`/api/users/${userid}/classrooms/${classid}}`) as Promise<Classroom>
    },
  },

  classroom: {
    get(classid) {
      return fetch(`/api/classrooms/${classid}`) as Promise<Classroom>
    },
    use(classid) {
      const prefix = `/api/classrooms/${classid}`
      return {
        category: {
          getAll() {
            return fetch(`${prefix}/categories`) as Promise<Category[]>
          },
          create(data) {
            return create(`${prefix}/categories`) as Promise<Category>
          },
          get(categoryid) {
            return fetch(`${prefix}/categories/${categoryid}`) as Promise<Category>
          },
          delete(categoryid) {
            return remove(`${prefix}/categories/${categoryid}`) as Promise<Category>
          }
        }
      }
    }
  },

  classroomcategories: {
    getAll(classid) {
      return fetch(`/api/classrooms/${classid}/categories`) as Promise<Category[]>
    },
    create(data, classid) {
      return create(`/api/classrooms/${classid}/categories`) as Promise<Category>
    },
    get(classid, categoryid) {
      return fetch(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Category>
    },
    delete(classid, categoryid, sectionid) {
      return remove(`/api/classrooms/${classid}/categories/${categoryid}`) as Promise<Category>
    }
  },

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

} satisfies ClientAPILookup

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

// Fetch -> must always return a data.
// Update -> may expect a data or nothing -> takes partial input type -> return empty object if no data
// Replace -> must contain all data type -> takes partial input type -> return empty object if no data
//

function mustReturnData<ReturnType>(p: AxiosResponse<ReturnType, any>): AxiosResponse<ReturnType, any>['data'] {
  if (p.data === undefined) throw new Error('Client Fetch Method must return a data!')
  return p.data
}

async function fetch<ReturnType>(url: string) {
  return mustReturnData(await axios.get<ReturnType>(url))
}

async function update<InputType, ReturnType = true>(url: string, data: p<InputType>) {
  return mustReturnData(await axios.put<ReturnType>(url, data))
}

async function replace<InputType, ReturnType>(url: string, data: InputType) {
  return mustReturnData(await axios.put<ReturnType>(url, data))
}

async function create<InputType, ReturnType>(url: string, data?: InputType) {
  return mustReturnData(await axios.post<ReturnType>(url, data))
}

async function remove<ReturnType>(url: string) {
  return mustReturnData(await axios.delete<ReturnType>(url))
}

async function join<ReturnType>(url: string) {
  return mustReturnData(await axios.put<ReturnType>(url))
}

export const GET = axios.get
export const POST = axios.post
export const PUT = axios.put
export const PATCH = axios.patch
export const HEAD = axios.head
export const DELETE = axios.delete