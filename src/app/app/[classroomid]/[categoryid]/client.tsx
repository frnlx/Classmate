'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

// This component sets the state of the Sidebar from the given url parameter.
const RoomCategoryPageClientHandler = (p: { children: ReactNode, classroomid: string, categoryid: string }) => {

  // Required to get the selected room id and to get the id of the selected page later.
  const [loading, setLoading] = useState<boolean>(true)
  const page = usePage()
  const router = useRouter()


  // This is required to set the state of the Sidebar, which belong to the parent Layout
  //  parent layout doesn't have access to categoryid params hence it must be done in context.
  useEffect(() => {

    if (page.list.length > 1) {
      const res = page.switch(p.categoryid);
      if (res) {
        // If category is found... do nothing
      } else {
        // If class not found, redirect to /home page
        router.push(`/app/${p.classroomid}/home`)
      }
    }

  },[page.list])
  // The dependencies are required if User acecss directly via link.

  return (
      <>
        {p.children}
      </>
  );
}
 
export default RoomCategoryPageClientHandler;