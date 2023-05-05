'use client'

import { usePage } from "@/app/app/[classroomid]/PageContext";
import { ReactNode, useEffect, useState } from "react";

const AssignmentPageClientHandler = (p: { children: ReactNode, params: any }) => {

  const [loading, setLoading] = useState<boolean>(true)
  const page = usePage()

  useEffect(() => {

    const res = page.switch('assignments');
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
 
export default AssignmentPageClientHandler;