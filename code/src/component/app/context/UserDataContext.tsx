/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import SignOutButton from "@/component/client/auth/sign-out-button"
import { Routes } from "@/component/lib/route-helper"
import { UserData } from "@/server/types/fetchmodels"
import { User } from "@prisma/client"
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
const LoadUserData = (p: { children: ReactNode, session: Session }) => {
  const [userData, setUserData] = useState<UserData | undefined>()

  const fetchUserData = () => {
    axios(Routes.UserInfo(p.session.user.id))
      .then(res => {
        console.log('Fetching user Data')
        console.log(typeof res.data)
        setUserData(res.data)
      })
  }

  useEffect(() => {
    fetchUserData()
  },[])

  return (
    userData ?
      <UpdateUserDataContext.Provider value={fetchUserData}>
        <UserDataContext.Provider value={userData}>
          {p.children}
        </UserDataContext.Provider>
      </UpdateUserDataContext.Provider>
      :
      <div className="text-slate-500 w-full h-full flex justify-center items-center">
        <span className="text-2xl font-semibold">Loading...</span>
        <SignOutButton />
      </div>
  );
}

// Export
// ------
export default LoadUserData