'use client'

import { ReactNode } from "react";

type props = {
  children: ReactNode
}

const ClassUI = ({ children }: props) => {
  return (
    <div className="text-slate-200">
      {children}
    </div>
  );
}
 
export default ClassUI;