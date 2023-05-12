import { redirect } from "next/navigation";

const ClassroomPage = (p: { params: any }) => {
  
  redirect(`/app/${p.params['classroomid']}/home`)
}

export default ClassroomPage;