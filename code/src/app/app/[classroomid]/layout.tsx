import PageContextProvider from "@/app/app/[classroomid]/PageContext";
import { ReactNode } from "react";
import ClassPageClientHandler from "./client";
import SidebarItem from "./(sidebar)/SidebarItem";
import CategoryList from "./(sidebar)/CategoryList";
import CategoryAddButton from "./(sidebar)/CategoryAddButton";
import Sidebar from "./(sidebar)/Sidebar";

const AppRoomLayout = (p: {children: ReactNode, params: any}) => {
  return (
    <PageContextProvider>
      <ClassPageClientHandler params={p.params}>

        <Sidebar>
          <div>
            <SidebarItem value='Home' />
            <SidebarItem value='Assignment' />
          </div>
          <CategoryList />
          <CategoryAddButton />
        </Sidebar>
        
        <div className="p-8">
          {p.children}
        </div>

      </ClassPageClientHandler>
    </PageContextProvider>
  );
}
 
export default AppRoomLayout;