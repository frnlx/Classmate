// 'use client'

// import { Classroom } from "@prisma/client";
// import { Session } from "next-auth";
// import { useState } from "react";

// type props = {
//   session: Session
// }

// const ClassListPanel = ({ session }: props) => {
//   const [classList, setClassList] = useState<Classroom[]>()

//   return (
//     <div>
//       {
//         classList!.map(classroom =>
//           <div key={classroom.id}>
//             <p>{classroom.name}</p>
//             <button type="button">Delete</button>
//           </div>
//         )
//       }
//       <button type="button">Create New Cl assroom</button>
//     </div>
//   );
// }
 
// export default ClassListPanel;