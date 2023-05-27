'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AppRoom, useRoom } from "../../(member)/-Navbar/Navbar";
import { useUser } from "@/api/client/user";
import { useClassCategories } from "@/api/client/category";
import { AppPage } from "@/app/(member)/[classid]/-Sidebar/Pages";

// export type AppPage = {
//   index: number,
//   id: string,
//   isCategory: boolean,
// }
// export type PageContextType = {
//   list: AppPage[],
//   current: AppPage,
//   switch: (id: string) => boolean
//   room?: AppRoom,
// }

// const HomePage: AppPage = {
//   index: 0,
//   id: "home",
//   isCategory: false
// }
// const AssignmentPage: AppPage = {
//   index: 1,
//   id: "assignments",
//   isCategory: false
// }
// const defaultPages: AppPage[] = [HomePage, AssignmentPage]

// let switchPage = (id: string) => false
// const PageContext = createContext<PageContextType>({
//   list: [],
//   current: HomePage,
//   switch: switchPage,
// })
// export const usePage = () => useContext(PageContext)

const PageContextProvider = (p: { children: ReactNode }) => {

  // const { data: userData, isLoading } = useUser();

  // useEffect(() => {
    // for every update of selectedClass, set Category List.
    // if (!userData) return;

    // if (categoryList) {
      // const categories = userData.classes.filter(c => c.id === room.id )[0].categories;
      // const list = categoryList.map<AppPage>((c, i) => (
      //   {
      //     index: i + 2,
      //     isCategory: true,
      //     id: c.id,
      //   }))
      // setPageList([...defaultPages,...list])
    // }
    
  // }, [userData, categoryList ])
  // UserData Deps is required so that when the user data is updated, it will also refresh the list.

  // return (
  //   {p.children}
  // );
}
 
export default PageContextProvider;