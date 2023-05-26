'use client'

import { UserAPI } from "@/api/route-helper";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

type prop = {
  userId: string
  classId: string
}

const JoinClassButton = (p: prop) => {
  const router = useRouter()
  return (
    <Button onClick={() => {
      UserAPI
        .JoinClass(p.userId, { classid: p.classId })
        .then(
          (res) => {
            if (res.status === 200) {
              router.push(`/classroom/${p.classId}`)
            }
          }
        )
    }}>Join Class</Button>
  );
}
 
export default JoinClassButton;