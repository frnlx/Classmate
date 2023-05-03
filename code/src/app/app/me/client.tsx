'use client'

import { useRoom } from "@/app/app/RoomContext";
import { ReactNode, useEffect } from "react";

const MeClientHandler = (p: { children: ReactNode }) => {

  const { switchToMe } = useRoom();

  useEffect(() => {
    switchToMe()
  },[])

  return (
    <>
      {p.children}
    </>
  );
}
 
export default MeClientHandler;