import { redirect } from "next/navigation"

export const RedirectRouteToMePage = () => {
  redirect('/app/me')
}
export const RedirectRouteToClassHomePage = (p: { params: any }) => {
  redirect(`/app/${p.params['classroomid']}/home`)
}