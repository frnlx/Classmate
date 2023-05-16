import { CategoryData, ClassroomData, SectionData, UserData } from "@/server/types/fetchmodels";
import { Resource, Section, User } from "@prisma/client"
import axios, { AxiosResponse } from "axios"

export const Routes = {
  UserInfo: (userid: string) => `/api/users/${userid}`, // done
  UserUpdate: (userid: string) => `/api/users/${userid}/update`, // done
  UserJoinClass: (id: string) => `/api/users/${id}/joinClass`, // done

  ClassCreate: `/api/classroom/create`,  // done
  ClassInfo: (id: string) => `/api/classroom/${id}`, // done
  ClassInvites: (id: string) => `/api/classroom/${id}/invites`, // done
  ClassInviteCreate: (id: string) => `/api/classroom/${id}/invites/create`,
  ClassCategoryCreate: (id: string) => `/api/classroom/${id}/createCategory`,

  CategoryInfo: (id: string) => `/api/category/${id}`,
  CategoryDelete: (id: string) => `/api/cateogry/${id}`,

  SectionCreate: (id: string) => `/api/category/${id}/createSection`,

  ResourceCreate: (id: string) => `/api/section/${id}/createResource`,
}

type str = string
type APILookupTypeHelper = { [key: string]: (...param: any[]) => Promise<AxiosResponse> }; 

export const UserAPI = {
  GetUserData: (userid: str) =>                           GET<UserData>(`/api/users/${userid}`),
  UpdateUserInfo: (userid: str, data: Partial<User>) =>   PATCH(`/api/users/${userid}`, data),
  JoinClass: (userid: str, data: { classid: string }) =>  PATCH<ClassroomData>(`/api/users/${userid}/joinClass`, data),
  GetUserJoinedClassrooms: (userid: str) =>               GET<ClassroomData[]>(`/api/users/${userid}/classrooms`),
  GetUserOwnedClassrooms:(userid: str) =>                 GET<ClassroomData[]>(`/api/users/${userid}/owned-classrooms`),
  CreateClassroom:(userid: str) =>                        POST<ClassroomData>(`/api/users/${userid}/classrooms`),
}

export const ClassAPI: APILookupTypeHelper = {
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
  CreateResource: (classid: str, categoryid: str, sectionid: str) =>                  POST<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources`),
  GetResource: (classid: str, categoryid: str, sectionid: str, resourceid: str) =>    GET<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
  DeleteResource: (classid: str, categoryid: str, sectionid: str, resourceid: str) => DELETE<Resource>(`/api/classrooms/${classid}/categories/${categoryid}/sections/${sectionid}/resources/${resourceid}`),
}

export const GET = axios.get;
export const POST = axios.post;
export const PUT = axios.put;
export const PATCH = axios.patch;
export const HEAD = axios.head;
export const DELETE = axios.delete;