import Navbar from "./Navbar";
import RoomContextProvider from "./RoomContext";
import { ReactNode } from "react";

type props = {
  children: ReactNode
}

const NavbarRoot = ({ children }: props) => {
  return (
    <RoomContextProvider>
      <Navbar />
      {children}
    </RoomContextProvider>
  );
}
 
export default NavbarRoot;  