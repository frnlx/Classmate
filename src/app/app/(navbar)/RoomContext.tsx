'use client'

import { Classroom } from "@prisma/client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { useUserData } from "../(providers)/UserDataContext"
import { UserData } from "@/server/types/fetchmodels"

export type AppRoom = {
  index: number,
  id: string,
  isMeRoom: boolean,
  data?: Classroom
}
export type RoomContextType = {
  list: AppRoom[],
  current: AppRoom,
  switch: (id: string) => boolean,
  switchToMe: () => void,
}

const MeRoom: AppRoom = {
  index: 0,
  id: "me",
  isMeRoom: true,
}

// CreateContext & UseContext
// --------------------------
let switchRoom = (id: string) => false;
let goToMeRoom = () => { };
const RoomContext = createContext<RoomContextType>({
  list: [],
  current: MeRoom,
  switch: switchRoom,
  switchToMe: goToMeRoom,
})
export const useRoom = () => useContext(RoomContext)

// Context Component
// -----------------
const RoomContextProvider = (p: { children: ReactNode}) => {
  const userData: UserData = useUserData()!;

  const [roomList, setRoomList] = useState<AppRoom[]>([MeRoom])
  const [selectedRoom, setSelectedRoom] = useState<AppRoom>(MeRoom)

  useEffect(() => {
    // for every update of userData, set Class List.
    const list = userData.classes.map<AppRoom>(
      (classroom, idx) => ({
        index: idx + 1,
        id: classroom.id,
        data: classroom,
        isMeRoom: false,
      })
    )
    setRoomList(prev => [...prev, ...list])

  },[userData])

  switchRoom = (id: string) => {
    const room = roomList.find(r => r.id === id);
    if (!room) {
      return false
    } else {
      setSelectedRoom(room)
      return true;
    }
  }
  goToMeRoom = () => {
    setSelectedRoom(roomList[0])
  }

  return (
    <RoomContext.Provider value={{
      list: roomList,
      current: selectedRoom,
      switch: switchRoom,
      switchToMe: goToMeRoom,
    }}>
      {p.children}
    </RoomContext.Provider>
  );
}

// Export
// ------
export default RoomContextProvider

