'use client'

import { Category } from "@prisma/client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useUserData } from "../(providers)/UserDataContext";
import { UserData } from "@/server/types/fetchmodels";
import { AppRoom, useRoom } from "../(providers)/RoomContext";

export type AppPage = {
  index: number,
  id: string,
  isCategory: boolean,
  data?: Category
}

export type PageContextType = {
  list: AppPage[],
  current: AppPage,
  switch: (id: string) => boolean
  room?: AppRoom,
}

const HomePage: AppPage = {
  index: 0,
  id: "home",
  isCategory: false
}
const AssignmentPage: AppPage = {
  index: 1,
  id: "assignments",
  isCategory: false
}
const defaultPages: AppPage[] = [HomePage, AssignmentPage]

let switchPage = (id: string) => false
const PageContext = createContext<PageContextType>({
  list: [],
  current: HomePage,
  switch: switchPage,
})
export const usePage = () => useContext(PageContext)

const PageContextProvider = (p: { children: ReactNode }) => {

  const userData: UserData = useUserData()!;
  const { current: room } = useRoom()

  const [pageList, setPageList] = useState<AppPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<AppPage>(HomePage)

  switchPage = (toid: string) => {
    const page = pageList.find(({ id }) => id === toid)
    if (!page) return false
    setSelectedPage(page)
    return true
  }

  useEffect(() => {
    // for every update of selectedClass, set Category List.
    const selectedClassroom = room.data
    if (selectedClassroom) {
      console.log("Initializing pages")
      const categories = userData.classes.filter(c => c.id === selectedClassroom.id)[0].categories;
      const list = categories.map<AppPage>((c, i) => (
        {
          index: i + 2,
          isCategory: true,
          id: c.id,
          data: c
        }))
      setPageList([...defaultPages,...list])
      }
  }, [userData, room.data])
  // UserData Deps is required so that when the user data is updated, it will also refresh the list.

  return (
    <PageContext.Provider value={{
      current: selectedPage,
      list: pageList,
      switch: switchPage,
      room
    }} >
      {p.children}
    </PageContext.Provider>
  );
}
 
export default PageContextProvider;