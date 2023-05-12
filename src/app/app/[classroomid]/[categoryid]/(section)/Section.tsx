import { ReactNode } from "react";
import AddPostButton from "./(resources)/ResourceAddButton";
import ResourceItem from "./(resources)/ResourceItem";
import { Resource } from "@prisma/client";

const Section = (p: {
  children: ReactNode,
  label: string,
  sectionid: string,
  posts: Resource[],
  id: string,
}) => {
  return (<div className="shadow-outline-section rounded-md text-slate-400">
    <div className="p-4">{p.label}</div>
    <hr />
    <div className="p-2">
      {p.children}
      
    </div>
  </div>);
}

export default Section;


