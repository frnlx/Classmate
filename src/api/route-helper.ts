import { CategoryData, ClassroomData, SectionData, UserData } from "@/types/fetchmodels";
import { Classroom, Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"

type s = string
type p<T> = Partial<T>


export const ClientAPI = {
  /**
   *    /users/${userid}
   */
  user: {
    get: (userid: s) =>
      fetch<User>(`/api/users/${userid}`),
    update: (uid: s, data: p<User>) =>
      PATCH<User>(`/api/users/${uid}`, data)
  },
  userclassrooms: {
    get: (userid: s) =>
      GET<User>(`/api/users/${userid}/classrooms`),
    join: (userid: s, classid: s) =>
      PATCH<ClassroomData>(`/api/users/${userid}/joinClass`)
  }
}

export const UserAPI = {
  UpdateUserInfo: (userid: s, data: Partial<User>) => PATCH(`/api/users/${userid}`, data),
  JoinClass: (userid: s, data: { classid: s }) => PATCH<ClassroomData>(`/api/users/${userid}/joinClass`, data),
  GetUserJoinedClassrooms: (userid: s) =>
    GET<ClassroomData[]>(`/api/users/${userid}/classrooms`).then(res => res.data),
  GetUserOwnedClassrooms: (userid: s) => GET<ClassroomData[]>(`/api/users/${userid}/owned-classrooms`),
  CreateClassroom: (userid: s) => POST<ClassroomData>(`/api/users/${userid}/classrooms`).then(res => res.data),
}

export const ClassAPI = {
  GetClassData: (classid: s) => GET<ClassroomData>(`/api/classrooms/${classid}`),

  // Invites
  GetClassInvites: (classid: s) => GET<ClassroomData>(`/api/classrooms/${classid}/invites`),
  CreateClassInvite: (classid: s) => POST<ClassroomData>(`/api/classrooms/${classid}/invites`),

  // Categories
  GetClassCategories: (classid: s) => GET<CategoryData[]>(`/api/classrooms/${classid}/categories`),
  CreateClassCategory: (classid: s) => POST<CategoryData>(`/api/classrooms/${classid}/categories`),
  GetCategory: (classid: s, categoryid: s) => GET<CategoryData>(`/api/classrooms/${classid}/categories/${categoryid}`),
  DeleteCategory: (classid: s, categoryid: s) => DELETE<CategoryData>(`/api/classrooms/${classid}/categories/${categoryid}`),

  // Sections
  GetCategorySections: (classid: s, categoryid: s) => GET<SectionData[]>(`/api/classrooms/${classid}/categories/${categoryid}`),
  CreateSection: (classid: s, categoryid: s) => POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}`),
  GetSection: (classid: s, categoryid: s, sectionid: s) => POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),
  DeleteSection: (classid: s, categoryid: s, sectionid: s) => DELETE<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),

  // Resources
  GetSectionResources: (classid: s, categoryid: s, sectionid: s) => GET<Resource[]>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`),
  CreateResource: (classid: s, categoryid: s, sectionid: s, data: any) => POST<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`, data),
  GetResource: (classid: s, categoryid: s, sectionid: s, resourceid: s) => GET<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
  DeleteResource: (classid: s, categoryid: s, sectionid: s, resourceid: s) => DELETE<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
}

async function fetch<ReturnType>(url: string) {
  return (await axios.get<ReturnType>(url))?.data
}

async function create<ReturnType>(url: string, data: any) {
  return (await axios.post<ReturnType>(url, data))?.data
}

async function remove<ReturnType>(url: string) {
  return (await axios.delete<ReturnType>(url))?.data
}

async function join<ReturnType>(url: string) {

}

export const GET = axios.get;
export const POST = axios.post;
export const PUT = axios.put;
export const PATCH = axios.patch;
export const HEAD = axios.head;
export const DELETE = axios.delete;