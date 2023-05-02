'use client'

import { Tab } from "@headlessui/react";
import { Content, Root } from "@radix-ui/react-tabs";
import { ReactNode } from "react";

const ClassSidebarContent = (p: {children: ReactNode, value: string}) => {
  return (
    <Tab.Panel className="p-8">
      {p.children}
    </Tab.Panel>
  );
}
 
export default ClassSidebarContent;