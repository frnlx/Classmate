import { HTMLProps } from "react";

interface prop extends React.HTMLAttributes<HTMLLIElement>{
  selected: boolean,
}

const ClassListItem = ({className, selected, ...rest}:prop) => {
  return (
    <li {...rest} className={"transition-all duration-200 w-14 h-14 rounded-3xl hover:bg-slate-300 hover:rounded-xl "+(selected ? "bg-slate-300" : "bg-slate-600")}>
      
    </li>
  );
}
 
export default ClassListItem;