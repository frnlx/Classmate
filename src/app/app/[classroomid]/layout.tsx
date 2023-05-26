import PageContextProvider from "@/app/app/[classroomid]/PageContext";
import { ReactNode } from "react";
import ClassPageClientHandler from "./client";
import SidebarItem from "./-Sidebar/SidebarItem";
import CategoryList from "./-Sidebar/CategoryList";
import CategoryAddButton from "./-Sidebar/CategoryAddButton";
import Pages from "../../(member)/[classid]/-Sidebar/Pages";
import ScrollArea from "@/client/ui/scrollarea";

const ClassroomLayout = (p: { children: ReactNode, params: any }) => {

  return (
    // <PageContextProvider>
      <ClassPageClientHandler params={p.params}>

        <Pages>
          <div>
            <SidebarItem value='Home' />
            <SidebarItem value='Assignment' />
          </div>
          <CategoryList />
          <CategoryAddButton />
        </Pages>
        
        <ScrollArea>
          <div className="flex flex-col gap-4 flex-grow-1 w-full">
            {p.children}
          </div>
        </ScrollArea>

      </ClassPageClientHandler>
    // </PageContextProvider>
  );
}
 
export default ClassroomLayout;