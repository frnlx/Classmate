'use client'

import { ReactNode } from "react";
import ClassListItem from "./AppClassListItem";
import { useSelectedClass, useUpdateSelectedClass } from "./context/ClassContext";
import ClassListItemAdd from "./AppClassListItemAdd";

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

        <ClassListItem selected={selectedClass === 0 ? true : false} onClick={
          () => updateSelectedClass(0)
        } />
        
        <hr className="border-slate-500" />
        {
          [...Array(5)].map(
            (classroom, i) => <ClassListItem key={i} onClick={
              () => updateSelectedClass(i + 1)
            } selected={(i === selectedClass - 1) ? true : false} />
          )
        }

        <ClassListItemAdd onClick={() => {
          
        }} />

      </ul>
    </div>
  );
}
 
export default ClassList;