import { CategoryData, ClassroomData, SectionData, UserData } from "@/types/fetchmodels";
import { Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"

type str = string
type APILookupTypeHelper = { [key: string]: (...param: any[]) => Promise<AxiosResponse> }; 

export const UserAPI = {
  GetUserData: (userid: str) => GET<UserData>(`/api/users/${userid}`).then(res => res.data),
  UpdateUserInfo: (userid: str, data: Partial<User>) =>   PATCH(`/api/users/${userid}`, data),
  JoinClass: (userid: str, data: { classid: string }) =>  PATCH<ClassroomData>(`/api/users/${userid}/joinClass`, data),
  GetUserJoinedClassrooms: (userid: str) => GET<ClassroomData[]>(`/api/users/${userid}/classrooms`).then(res => res.data),
  GetUserOwnedClassrooms:(userid: str) =>                 GET<ClassroomData[]>(`/api/users/${userid}/owned-classrooms`),
  CreateClassroom: (userid: str) => POST<ClassroomData>(`/api/users/${userid}/classrooms`).then(res => res.data),
}

export const ClassAPI = {
  GetClassData: (classid: str) => GET<ClassroomData>(`/api/classrooms/${classid}`),

  // Invites
  GetClassInvites: (classid: str) =>    GET<ClassroomData>(`/api/classrooms/${classid}/invites`),
  CreateClassInvite: (classid: str) =>  POST<ClassroomData>(`/api/classrooms/${classid}/invites`),

  // Categories
  GetClassCategories: (classid: str) =>               GET<CategoryData[]>(`/api/classrooms/${classid}/categories`),
  CreateClassCategory: (classid: str) =>              POST<CategoryData>(`/api/classrooms/${classid}/categories`),
  GetCategory: (classid: str, categoryid: str) =>     GET<CategoryData>(`/api/classrooms/${classid}/categories/${categoryid}`),
  DeleteCategory: (classid: str, categoryid: str) =>  DELETE<CategoryData>(`/api/classrooms/${classid}/categories/${categoryid}`),

  // Sections
  GetCategorySections: (classid: str, categoryid: str) =>           GET<SectionData[]>(`/api/classrooms/${classid}/categories/${categoryid}`),
  CreateSection: (classid: str, categoryid: str) =>                 POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}`),
  GetSection: (classid: str, categoryid: str, sectionid: str) =>    POST<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),
  DeleteSection: (classid: str, categoryid: str, sectionid: str) => DELETE<SectionData>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}`),

  // Resources
  GetSectionResources: (classid: str, categoryid: str, sectionid: str) =>             GET<Resource[]>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`),
  CreateResource: (classid: str, categoryid: str, sectionid: str, data: any) =>       POST<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`, data),
  GetResource: (classid: str, categoryid: str, sectionid: str, resourceid: str) =>    GET<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
  DeleteResource: (classid: str, categoryid: str, sectionid: str, resourceid: str) => DELETE<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
}

export const GET = axios.get;
export const POST = axios.post;
export const PUT = axios.put;
export const PATCH = axios.patch;
export const HEAD = axios.head;
export const DELETE = axios.delete;