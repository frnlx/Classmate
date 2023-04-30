'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "../../../component/app/context/ClassContext";
import ClassMemberList from "../../../component/app/class/ClassMemberList";
import { Root } from "@radix-ui/react-tabs";

const ClassScreen = (p: {children: ReactNode, defaultValue: string}) => {
  const selectedClass = useSelectedClass()

  return selectedClass.order !== 0 ? (
    <Root
      orientation="vertical"
      defaultValue={p.defaultValue}
      onValueChange={(data) => {
        console.log('Value changed to '+data)
      }}
      className="flex"
    >
      {p.children}
    </Root>
  ) : <></>;
}
 
export default ClassScreen;