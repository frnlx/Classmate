import PageContextProvider from "@/app/app/[classroomid]/PageContext";
import { ReactNode } from "react";
import ClassPageClientHandler from "./client";
import SidebarItem from "./(sidebar)/SidebarItem";
import CategoryList from "./(sidebar)/CategoryList";
import CategoryAddButton from "./(sidebar)/CategoryAddButton";
import Sidebar from "./(sidebar)/Sidebar";
import ScrollArea from "@/component/ui/scrollarea";

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
        
        <ScrollArea>
          <div className="flex flex-col gap-4 flex-grow-1 w-full">
            {p.children}
          </div>
        </ScrollArea>

      </ClassPageClientHandler>
    </PageContextProvider>
  );
}
 
export default ClassroomLayout;