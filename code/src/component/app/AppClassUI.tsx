'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "./context/ClassContextProvider";

type props = {
  children: ReactNode
}

const ClassUI = ({ children }: props) => {
  const selectedClass = useSelectedClass();

  return (
    <div>
      <div className="text-slate-200 p-10">{selectedClass}</div>
      {children}
    </div>
  );
}
 
export default ClassUI;