'use client'

import { Class } from "@/server/lib/models/class";
import { Session } from "next-auth";
import { useState } from "react";

type props = {
  session: Session
}

const ClassListPanel = ({ session }: props) => {
  const [classList, setClassList] = useState<Class[]>()

  return (
    <div>
      {
        classList!.map(classroom =>
          <div key={classroom.id}>
            <p>{classroom.classname}</p>
            <button type="button">Delete</button>
          </div>
        )
      }
      <button type="button">Create New Cl assroom</button>
    </div>
  );
}
 
export default ClassListPanel;