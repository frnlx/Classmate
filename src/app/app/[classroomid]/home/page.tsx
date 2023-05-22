import { ReactNode } from "react";
import RoomHomePageClientHandler from "./client";

const RoomHomePage = (p: { params: any }) => {
  return (
    <RoomHomePageClientHandler params={p.params}>
      <div>
      <h1>This is Class Screen</h1>
      <div>This is server side-rendering</div>
      <h3>Member List</h3>
      <h3>Invite Link</h3>
        Home page Yessir!!
      </div>
    </RoomHomePageClientHandler>
  );
}
 
export default RoomHomePage;