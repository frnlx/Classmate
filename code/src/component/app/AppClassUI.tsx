'use client'

import { ReactNode } from "react";
import { useSelectedClass } from "./context/ClassContext";

type props = {
  children: ReactNode
}

const ClassUI = ({ children }: props) => {
  const selectedClass = useSelectedClass();

  return (
    <div className="text-slate-200">
      {children}
    </div>
  );
}
 
export default ClassUI;