import { ReactNode } from "react";
import RoomCategoryPageClientHandler from "./client";
import DisplayCategoryPage from "./content";

const CategoryPageLayout = (p: { params: any, children: ReactNode }) => {
  
  const classroomid = p.params['classroomid'] as string;
  const categoryid = p.params['categoryid'] as string;

  return (
    <RoomCategoryPageClientHandler
      classroomid={classroomid}
      categoryid={categoryid}
    >
      <DisplayCategoryPage
        categoryid={categoryid}
      >
        {p.children}
      </DisplayCategoryPage>
    </RoomCategoryPageClientHandler>
  );
}
 
export default CategoryPageLayout;