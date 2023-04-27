'use client'

import ClassListItem from "./AppClassListItem";
import { useSelectedClass, useUpdateSelectedClass } from "./context/ClassContext";
import ClassListItemAdd from "./AppClassListItemAdd";
import { useUpdateUserData, useUserData } from "./context/UserDataContext";
import axios from "axios";
import { Routes } from "../lib/route-helper";

type props = {
  // children: ReactNode
  // data: UserClassData;
}

const ClassList = ({ }: props) => {

  const user = useUserData();
  const updateUserData = useUpdateUserData();

  const selectedClass = useSelectedClass();
  const updateSelectedClass = useUpdateSelectedClass();

  return (
    <div className="bg-slate-900 w-24 h-screen p-5 border-r border-slate-800 flex flex-col gap-4">

      <ul>
      <ClassListItem selected={selectedClass.order === 0 ? true : false} onClick={
        () => {
          // Logic for selecting class
          updateSelectedClass(0)
        }
          
      } image={user?.pfp} />
      </ul>
      <hr className="border-slate-500" />
      <div className="text-slate-600 text-xs pb-4 align-middle font-black">Class List</div>
      <ul className="flex flex-col gap-4">
        {
          user!.classes.map(
            (classroom, i) => <ClassListItem key={i} onClick={
              () => updateSelectedClass(i + 1)
            } selected={(i === selectedClass.order - 1) ? true : false} />
          )
        }

        <ClassListItemAdd onClick={
          () => {
            axios.post(Routes.ClassCreate)
              .then(
                (res) => {
                  if (res.status === 200) updateUserData();
                }
              )
          }
        } />

      </ul>
    </div>
  );
}
 
export default ClassList;