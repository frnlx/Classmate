'use client'

import { Content } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

const ClassSidebarContent = (p: {children: ReactNode, value: string}) => {
  return (
    <Content value={p.value} className="p-8">
      {p.children}
    </Content>
  );
}
 
export default ClassSidebarContent;