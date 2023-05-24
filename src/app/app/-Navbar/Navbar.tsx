'use client'

import NavbarItem from "./NavbarItem";
import NavbarItemAddButton from "./NavbarItemAddButton";
import { useRouter } from "next/navigation";
import { AppRoom, useRoom } from "./RoomContext";
import { Classroom } from "@prisma/client";
import { useCreateClass, useUser, useUserClassList } from "@/api/client/user";
import { SkeletonCircle } from "@chakra-ui/react";

const Navbar = () => {
  const router = useRouter()
  const { data: user } = useUser();
  const { data: classList } = useUserClassList();
  const room = useRoom();

  const onMeRoomItemClick = () => {
    router.push(`/app/me`)
  }

  const onClassRoomItemClick = (classroomid: string) => {
    room.switch(classroomid)
    router.push(`/app/${classroomid}`)
  }

  return (
    <div className="bg-zinc-950 w-24 h-screen p-5 flex flex-col gap-4">
      <ul>
        {
          user ? <NavbarItem
            selected={room.current.index === 0 ? true : false}
            onClick={onMeRoomItemClick}
            image={user?.pfp} /> : <SkeletonCircle size='14'/>
        }
      </ul>
      <hr className="border-slate-700 border-1" />
      <ul className="flex flex-col gap-4">
        {
          classList ? classList.map(
            (classroom, i) =>
              <NavbarItem
                key={i}
                onClick={() => onClassRoomItemClick(classroom.id)}
                selected={i === (room.current.index - 1)}
                classroom={classroom as Classroom}
              />
            ) : <></>
        }
        {
          user ?  <NavbarItemAddButton userid={user.id} /> : <> </>
        }
      </ul>
    </div>
  );
}
 
export default Navbar;