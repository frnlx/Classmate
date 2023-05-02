import { ReactNode } from "react";
import RoomCategoryPageClientHandler from "./client";

const RoomCategoryPage = (p: { children: ReactNode, params: any }) => {

  return (
    <RoomCategoryPageClientHandler params={p.params} >
      <div>
        Category Yessir!!
      </div>
    </RoomCategoryPageClientHandler>
  );
}
 
export default RoomCategoryPage;