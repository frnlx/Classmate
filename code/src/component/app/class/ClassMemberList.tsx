'use client'

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Routes } from "../../lib/route-helper";
import axios from "axios";
import { ClassroomData } from "@/server/types/fetchmodels";
import { useSelectedClass } from "../context/ClassContext";

// This is one of the example of a component
//  to fetch upon mounted.

// Data will be fetched when rendered.

const ClassMemberList = () => {
  
  const [classMembers, setClassMembers] = useState<User[]>();
  const selectedClass = useSelectedClass();
  
  const fetchClassMembers = () => {
    axios(Routes.ClassInfo(selectedClass.data!.id)).then(
      (res) => {
        setClassMembers((res.data as ClassroomData).members)
      }
    )
  }

  useEffect(() => (
    fetchClassMembers()
  ), [])

  return (
    <div>
      {
        classMembers===undefined ? 'Loading Class Member Data...' : 
          classMembers.map(member => <div key={member.id}>{member.name}</div>)
      }
    </div>
  );
}
 
export default ClassMemberList;