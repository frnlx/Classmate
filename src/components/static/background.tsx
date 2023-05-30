import { ReactNode } from "react";

function AppBackground(p: { children: ReactNode }) {
  return (<div className="w-screen h-screen flex flex-col justify-center items-center text-slate-200 bg-radialGreenGradient ">
    {p.children}
  </div>);
}
 
export default AppBackground;