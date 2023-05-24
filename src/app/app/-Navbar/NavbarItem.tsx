import Image from "next/image";
import NavbarItemContextMenu from "./NavbarItemContextMenu";
import { Classroom } from "@prisma/client";

interface prop extends React.HTMLAttributes<HTMLLIElement>{
  selected: boolean,
  image?: string
  classroom?: Classroom
}

const NavbarItem = ({className, selected, image, classroom, ...rest}:prop) => {
  return (
    <NavbarItemContextMenu classroom={classroom}>
      <li {...rest} className={"overflow-hidden transition-all duration-200 w-14 h-14 rounded-3xl hover:bg-slate-300 hover:rounded-xl cursor-pointer "+(selected ? "bg-slate-300" : "bg-slate-600")}>
        {
          image ? <Image src={image} alt={"This User's Profile Picture"} width={60} height={60}/> : null
        }
      </li>
    </NavbarItemContextMenu>
  );
}
 
export default NavbarItem;