'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "../context/ClassContext";

const MeScreen = (p: {children: ReactNode}) => {
  const selectedClass = useSelectedClass()

  return selectedClass === 0 ? (
    <div> 
      <p>This is Me Screen</p>
      {p.children}
    </div>
  ) : <></>;
}
 
export default MeScreen;