/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Routes } from "@/client/lib/route-helper"
import { UserData } from "@/server/types/fetchmodels"
import axios from "axios"
import { Session } from "next-auth"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

// CreateContext & UseContext
// --------------------------
const UserDataContext = createContext<UserData | undefined>(undefined)
export const useUserData = () => useContext(UserDataContext)

const UpdateUserDataContext = createContext<any | undefined>(undefined)
export const useUpdateUserData = () => useContext(UpdateUserDataContext)

// Context Component
// -----------------
const LoadUserDataContext = (p: { children: ReactNode, session: Session, loading: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>()

  const fetchUserData = () => {
    axios(Routes.UserInfo(p.session.user.id))
      .then(res => {
        console.log('Fetching user Data')
        console.log(typeof res.data)
        console.log(res.data)
        setUserData(res.data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    userData ?
      <UpdateUserDataContext.Provider value={fetchUserData}>
        <UserDataContext.Provider value={userData}>
          {p.children}
        </UserDataContext.Provider>
      </UpdateUserDataContext.Provider>
      :
      <>{p.loading}</>
  );
}

// Export
// ------
export default LoadUserDataContext