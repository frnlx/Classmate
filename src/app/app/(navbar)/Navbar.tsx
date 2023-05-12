'use client'

import { useRoom } from "../(providers)/RoomContext";
import { useUpdateUserData, useUserData } from "../(providers)/UserDataContext";
import axios from "axios";
import { Routes } from "../../../component/lib/route-helper";
import { useRouter } from "next/navigation";
import NavbarItem from "./NavbarItem";
import NavbarItemAddButton from "./NavbarItemAddButton";

type props = {
  // children: ReactNode
  // data: UserClassData;
}

const Navbar = ({ }: props) => {

  const user = useUserData();
  const updateUserData = useUpdateUserData();

  const room = useRoom()
  const router = useRouter()

  const onMeRoomItemClick = () => {
    router.push(`/app/me`)
  }

  const onClassRoomItemClick = (classroomid: string) => {
    router.push(`/app/${classroomid}`)
  }

  const onClassRoomCreateClick = () => {
    axios.post(Routes.ClassCreate)
      .then((res) => {
        if (res.status === 200) updateUserData();
      });
  }

  return (
    <div className="bg-zinc-950 w-24 h-screen p-5 flex flex-col gap-4">
      <ul>
        <NavbarItem
          selected={room.current.index === 0 ? true : false}
          onClick={onMeRoomItemClick}
          image={user?.pfp} />
      </ul>
      <hr className="border-slate-700 border-1" />
      <ul className="flex flex-col gap-4">
        {
          user!.classes.map(
            (classroom, i) =>
              <NavbarItem
                key={i}
                onClick={() => onClassRoomItemClick(classroom.id)}
                selected={i === (room.current.index - 1)} />)
        }
        <NavbarItemAddButton onClick={onClassRoomCreateClick} />
      </ul>
    </div>
  );
}
 
export default Navbar;