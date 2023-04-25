'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "../context/ClassContext";

const ClassScreen = (p: {children: ReactNode}) => {
  const selectedClass = useSelectedClass()

  return selectedClass !== 0 ? (
    <div> 
      <h1>This is Class Screen</h1>
      {p.children}
    </div>
  ) : <></>;
}
 
export default ClassScreen;