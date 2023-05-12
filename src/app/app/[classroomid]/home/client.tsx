'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext"
import { useRoom } from "@/app/app/(providers)/RoomContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

const RoomHomePageClientHandler = (p: { children: ReactNode, params: any }) => {

  const [loading, setLoading] = useState<boolean>(true)
  const room = useRoom()
  const page = usePage()
  const router = useRouter()

  useEffect(() => {

    const res = page.switch('home');
    if (res) {
      setLoading(false)
    }

  },[])

  return (
    !loading ?
      <>
        {p.children}
      </> : <></>
  );
}
 
export default RoomHomePageClientHandler;