/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useUserData } from "@/api/client/user"
import { Session } from "next-auth"
import { ReactNode } from "react"

// CreateContext & UseContext
// --------------------------
// const UserDataContext = createContext<UserData | undefined>(undefined)
// export const useUserData = () => useContext(UserDataContext)

// const UpdateUserDataContext = createContext<any | undefined>(undefined)
// export const useUpdateUserData = () => useContext(UpdateUserDataContext)

// Context Component
// -----------------
const LoadUserDataContext = (p: { children: ReactNode, session: Session, loading: ReactNode }) => {

  const { isLoading, isError, data, error } = useUserData()

  if (isLoading) return <>{p.loading}</>
  if (isError) return <span>Error: {(error as any).message}</span>
  return <>{p.children}</>

  // return (
  //   <UpdateUserDataContext.Provider value={fetchUserData}>
  //     <UserDataContext.Provider value={data}>
  //       {p.children}
  //     </UserDataContext.Provider>
  //   </UpdateUserDataContext.Provider>
  // );
}

// Export
// ------
export default LoadUserDataContext