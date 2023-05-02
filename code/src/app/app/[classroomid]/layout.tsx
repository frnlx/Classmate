import PageContextProvider from "@/component/app/context/PageContext";
import { ReactNode } from "react";
import ClassPageClientHandler from "./client";
import ClassSidebar from "./(sidebar)/classSidebar";
import ClassSidebarItem from "./(sidebar)/(list)/classSidebarItem";
import ClassCategoryList from "./(sidebar)/(list)/classCategoryList";
import CreateClassCategory from "./(sidebar)/(list)/createClassCategory";
import ClassSidebarContent from "./(sidebar)/classSidebarContent";
import ClassMemberList from "@/component/app/class/ClassMemberList";
import ClassInviteList from "@/component/app/class/ClassInviteList";

const AppRoomLayout = (p: {children: ReactNode, params: any}) => {
  return (
    <PageContextProvider>
      <ClassPageClientHandler params={p.params}>
        <ClassSidebar>
          <div>
            <ClassSidebarItem value='Home' />
            <ClassSidebarItem value='Assignment' />
          </div>
          <ClassCategoryList />
          <CreateClassCategory />
        </ClassSidebar>
        <div className="p-8">
        {p.children}
        </div>
      </ClassPageClientHandler>
      
    </PageContextProvider>
  );
}
 
export default AppRoomLayout;