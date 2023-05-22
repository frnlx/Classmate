// 'use client'

// import { useClassroomQuery } from "@/api/client/classroom";
// import { useRoom } from "../../../app/app/-Navbar/RoomContext";

// const ClassInviteList = () => {

//   const room = useRoom()

//   const { data: classData } = useClassroomQuery(room.current.id)

//   return (
//     classData ?
//       <div>
//         <a href={`/app/join/${classData.inviteID}`}>{classData.inviteID}</a>
//       </div>
//       :
//       <>Loading...</>
//   );
// }
 
// export default ClassInviteList;