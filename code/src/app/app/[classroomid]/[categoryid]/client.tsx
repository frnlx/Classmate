'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { useRoom } from "@/app/app/RoomContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const RoomCategoryPageClientHandler = (p: { children: ReactNode, params: any }) => {

  const [loading, setLoading] = useState<boolean>(true)
  const page = usePage()
  const router = useRouter()

  useEffect(() => {

    if (page.list.length > 1) {
      console.log(page.list)
      console.log(`${p.params['categoryid']}`)
      const res = page.switch(p.params['categoryid']);
      if (res) {
        console.log('yes')
        setLoading(false)
      } else {
        console.log('no')
        router.push(`/app/${p.params['classroomid']}/home`)
      }
    }
  },[page.list])
  // The dependencies are required if User acecss directly via link.


  return (
    !loading ?
      <>
        {p.children}
      </> : <></>
  );
}
 
export default RoomCategoryPageClientHandler;