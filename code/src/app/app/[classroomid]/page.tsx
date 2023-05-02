import { ReactNode} from "react";
import { redirect } from "next/navigation";

const ClassScreen = (p: {children: ReactNode, params: any}) => {
  redirect(`/app/${p.params['classroomid']}/home`)
}
 
export default ClassScreen;