'use client'

import { Routes } from "@/api/route-helper";
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
      axios.post(Routes.UserJoinClass(p.userId), {classId: p.classId}).then(
        (res) => {
          if (res.status === 200) {
            router.push('/app/')
          }
        }
      )
    }}>Join Class</Button>
  );
}
 
export default JoinClassButton;