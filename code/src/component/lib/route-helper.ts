export const Routes = {
  UserInfo: (id: string) => `/api/user/${id}`,
  UserUpdate: (id: string) => `/api/user/${id}/update`,
  UserJoinClass: (id: string) => `/api/user/${id}/joinClass`,
  ClassCreate: `/api/classroom/create`, 
  ClassInfo: (id: string) => `/api/classroom/${id}`,
  ClassInvites: (id: string) => `/api/classroom/${id}/invites`,
  ClassInviteCreate: (id: string) => `/api/classroom/${id}/invites/create`,
}