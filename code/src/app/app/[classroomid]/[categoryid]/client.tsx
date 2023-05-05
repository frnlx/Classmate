'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const RoomCategoryPageClientHandler = (p: { children: ReactNode, classroomid: string, categoryid: string }) => {

  const [loading, setLoading] = useState<boolean>(true)
  const page = usePage()
  const router = useRouter()



  useEffect(() => {

    if (page.list.length > 1) {
      const res = page.switch(p.categoryid);
      if (res) {
        setLoading(false)
      } else {
        router.push(`/app/${p.classroomid}/home`)
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