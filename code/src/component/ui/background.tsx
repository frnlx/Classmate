import { ReactNode } from "react";

const AppBackground = (p:{children: ReactNode}) => {
  return (<div className="w-screen h-screen flex flex-col justify-center items-center text-slate-200 bg-zinc-950">
    {p.children}
  </div>);
}
 
export default AppBackground;