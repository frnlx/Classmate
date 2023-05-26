import { redirect } from "next/navigation"

export const RedirectRouteToClassHomePage = (p: { params: any }) => {
  redirect(`/app/${p.params['classroomid']}/home`)
}