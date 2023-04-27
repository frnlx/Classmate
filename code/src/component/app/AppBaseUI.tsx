import { ReactNode } from "react";

type props = {
  children: ReactNode
}

const Background = ({ children }: props) => {
  return (
    <div className="bg-slate-950 w-screen h-screen overflow-clip text-slate-20 flex flex-row gap-0">
      {children}
    </div>
  );
}
 
export default Background;