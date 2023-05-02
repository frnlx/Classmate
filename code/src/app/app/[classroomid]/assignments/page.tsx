import { ReactNode } from "react";
import AssignmentPageClientHandler from "./client";

const RoomHomePage = (p: { children: ReactNode, params: any }) => {

  return (
    <AssignmentPageClientHandler params={p.params} >
      <div>
        Assignment Yessir!!
      </div>
    </AssignmentPageClientHandler>
  );
}
 
export default RoomHomePage;