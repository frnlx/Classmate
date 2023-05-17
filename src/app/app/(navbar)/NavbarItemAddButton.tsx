'use client'

import { useCreateClass, useUser } from "@/api/client/user";

interface prop extends React.HTMLAttributes<HTMLButtonElement>{
  userid: string
}

const NavbarItemAddButton = ({ className, userid, ...rest }: prop) => {

  const createClassroomMutation = useCreateClass(userid)

  return (
    <button {...rest} className={`
    border-4 border-slate-600
    text-slate-400 text-lg
    transition-all duration-200 w-14 h-14 rounded-full 
    hover:border-slate-500
    flex justify-center items-center  
    group
    cursor-pointer
    `}
      onClick={() => createClassroomMutation.mutate()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="transition-all duration-200 fill-slate-600 group-hover:fill-slate-500">
        <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z" />
      </svg>
    </button>
  );
}
 
export default NavbarItemAddButton;