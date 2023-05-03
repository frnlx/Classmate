'use client'

import { useRoom } from "../../../app/app/RoomContext";

const ClassInviteList = () => {

  const room = useRoom()

  return (
    <div>
      <a href={`/app/join/${room.current.data!.inviteID}`}>{room.current.data!.inviteID}</a>
    </div>
  );
}
 
export default ClassInviteList;