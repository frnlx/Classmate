import PageContextProvider from "@/app/app/[classroomid]/PageContext";
import { ReactNode } from "react";
import ClassPageClientHandler from "./client";
import SidebarItem from "./(sidebar)/SidebarItem";
import CategoryList from "./(sidebar)/CategoryList";
import CategoryAddButton from "./(sidebar)/CategoryAddButton";
import Sidebar from "./(sidebar)/Sidebar";
import { getServerSession } from "next-auth";

const ClassroomLayout = (p: { children: ReactNode, params: any }) => {

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
        
        <div className="p-8 flex flex-col gap-4 flex-grow-1 w-full">
          {p.children}
        </div>

      </ClassPageClientHandler>
    </PageContextProvider>
  );
}
 
export default ClassroomLayout;