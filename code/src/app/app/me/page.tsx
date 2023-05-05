import { ReactNode, useEffect } from "react";
import SignOutButton from "@/component/client/auth/sign-out-button";
import MeClientHandler from "./client";

const MeRoom = (p: { children: ReactNode }) => {
  return (
    <MeClientHandler>
      <div>
        <h1>This is Me Screen</h1>
        <p>This is Me Screen, for debug only.</p>
        <hr className="border-slate-600 my-4" />
        {/* <h3>Pending Class Invite</h3> */}
        {/* <PendingInviteRequestList /> */}
        <h3>Search for Class</h3>
        <SignOutButton />
        {p.children}
      </div>
    </MeClientHandler>
  );
}
 
export default MeRoom;