import { ReactNode } from "react";
import RoomCategoryPageClientHandler from "./client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DisplayCategoryPage from "./content";
import { RouteParam, RouteParams } from "@/component/lib/client-helper";

const RoomCategoryPage = (p: { children: ReactNode, params: any }) => {

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
 
export default RoomCategoryPage;