'use client'

import { ReactNode } from "react";
import ClassListItem from "./AppClassListItem";
import { useSelectedClass, useUpdateSelectedClass } from "./context/ClassContextProvider";

type props = {
  // children: ReactNode
}

const ClassList = ({ }: props) => {
  const selectedClass = useSelectedClass();
  const updateSelectedClass = useUpdateSelectedClass();

  return (
    <div className="bg-slate-900 w-24 h-screen p-5 border-r border-slate-800">
      <div className="text-slate-600 text-sm pb-4 align-middle font-bold">ClassList</div>
      <ul className="flex flex-col gap-4">
      {
        [...Array(5)].map((classroom, i) => <ClassListItem key={i} onClick={() => updateSelectedClass(i)} selected={i === selectedClass ? true : false} />)
      }
      </ul>
    </div>
  );
}
 
export default ClassList;