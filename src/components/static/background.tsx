import { ReactNode } from "react";
import InteractiveBackground from "../use-client/InteractiveBackground"

export default function AppBackground(p: { children: ReactNode }) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center text-slate-200">
        { p.children }
      </div>
      <InteractiveBackground />
    </>
  )
}
