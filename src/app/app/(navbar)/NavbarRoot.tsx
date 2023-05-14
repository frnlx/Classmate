import RoomContextProvider from "./RoomContext";
import { ReactNode } from "react";
import Navbar from "./Navbar";

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