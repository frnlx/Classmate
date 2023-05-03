import Image from "next/image";

interface prop extends React.HTMLAttributes<HTMLLIElement>{
  selected: boolean,
  image?: string
}

const NavbarItem = ({className, selected, image, ...rest}:prop) => {
  return (
    <li {...rest} className={"overflow-hidden transition-all duration-200 w-14 h-14 rounded-3xl hover:bg-slate-300 hover:rounded-xl cursor-pointer "+(selected ? "bg-slate-300" : "bg-slate-600")}>
      {
        image ? <Image src={image} alt={"This User's Profile Picture"} width={60} height={60}/> : null
      }
    </li>
  );
}
 
export default NavbarItem;