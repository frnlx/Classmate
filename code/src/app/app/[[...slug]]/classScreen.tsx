'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "../../../component/app/context/ClassContext";
import ClassMemberList from "../../../component/app/class/ClassMemberList";

const ClassScreen = (p: {children: ReactNode}) => {
  const selectedClass = useSelectedClass()

  return selectedClass.order !== 0 ? (
    <div>
      {p.children}
    </div>
  ) : <></>;
}
 
export default ClassScreen;