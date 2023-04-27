'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "../../../component/app/context/ClassContext";

const MeScreen = (p: {children: ReactNode}) => {
  const selectedClass = useSelectedClass()

  return selectedClass.order === 0 ? (
    <div> 
      {p.children}
    </div>
  ) : <></>;
}
 
export default MeScreen;