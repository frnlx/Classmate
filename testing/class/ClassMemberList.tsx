// 'use client'

// import { User } from "@prisma/client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ClassroomData } from "@/server/types/fetchmodels";
// import { useRoom } from "../../../app/app/(Navbar)/RoomContext";
// import { Routes } from "@/api/client/route-helper";

// // This is one of the example of a component
// //  to fetch upon mounted.

// // Data will be fetched when rendered.

// const ClassMemberList = () => {
  
//   const [classMembers, setClassMembers] = useState<User[]>();
//   const room = useRoom();
  
//   const fetchClassMembers = () => {
//     axios(Routes.ClassInfo(room.current.data!.id)).then(
//       (res) => {
//         setClassMembers((res.data as ClassroomData).members)
//       }
//     ).catch(
//       (err) => {
//         // if 404 error due to unauthenticated pls redirect to auth page.
//       }
//     )
//   }

//   useEffect(() => (
//     fetchClassMembers()
//   ), [])

//   return (
//     <div>
//       {
//         classMembers===undefined ? 'Loading Class Member Data...' : 
//           classMembers.map(member => <div key={member.id}>{member.name}</div>)
//       }
//     </div>
//   );
// }
 
// export default ClassMemberList;