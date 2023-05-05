import { ReactNode } from "react";
import AddPostButton from "./PostAddButton";

const Section = (p: { children: ReactNode, label: string, sectionid: string}) => {
  return (<div className="shadow-outline-section rounded-md max-w-xl text-slate-400">
    <div className="p-4">{p.label}</div>
    <hr />
    <div className="p-2">
      <AddPostButton sectionid={p.sectionid} />
    </div>
  </div>);
}

export default Section;


