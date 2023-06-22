'use client'

import { ClientAPI } from "@/api/client/api"
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { Route } from "next"
import { useRouter } from "next/navigation";

type prop = {
  userId: string
  classId: string
}

export default function JoinClassButton(p: prop) {
  const router = useRouter()
  return (
    <Button onClick={ () => {
      ClientAPI.joinClassroom({ userid: p.userId, classid: p.classId })
        .then(data => {
          if(data) router.push(`/classroom/${p.classId}` as Route)
        })
    }}>Join Class</Button>
  );
}
