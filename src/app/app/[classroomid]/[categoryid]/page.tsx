import { ReactNode } from "react";
import RoomCategoryPageClientHandler from "./client";
import DisplayCategoryPage from "./content";

export default function RoomCategoryPage (p: { params: any }) {

  const classroomid = p.params['classroomid'] as string;
  const categoryid = p.params['categoryid'] as string;

  return (
    <RoomCategoryPageClientHandler classroomid={classroomid} categoryid={categoryid} >
      <DisplayCategoryPage categoryid={categoryid}>
        <div>
          Category Yessir!!
        </div>
      </DisplayCategoryPage>
    </RoomCategoryPageClientHandler>
  );
}
 