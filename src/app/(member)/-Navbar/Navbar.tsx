"use client";

import { useUserClassList } from "@/api/client/user";
import { ReactNode, useEffect, useState, useTransition } from "react";
import NavbarItemAddButton from "./NavbarItemAddButton";
import NavbarItem from "./NavbarItem";
import {
  notFound,
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import clsx from "clsx";
import { Category, Classroom, Member, User } from "@prisma/client";
import { createReactContext } from "@/lib/react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { ClientAPI } from "@/api/client/api";
import Link from "next/link";
import { ModalButton } from "@/components/use-client/Modal";
import { Route } from "next";
import ScrollArea from "@/components/use-client/ScrollArea";

// CreateContext & UseContext
// --------------------------
const { provider: RoomContextProvider, hook: useRoom } = createReactContext({
  currentId: "",
  userData: {} as UserData,
});

export function invalidateClasslist(qc: QueryClient) {
  qc.invalidateQueries(["classlist"]);
}

// Context Component
// -----------------
export default function Navbar(p: {
  children?: ReactNode;
  defaultRoom: ReactNode;
  staticRooms?: ReactNode;
  prefetchedUserData: UserData;
}) {
  //  Fetch initial User Class List
  // const { data: userClassList, isLoading } = useUserClassList(p.prefetchedUserData.classes)

  const { data: classlist } = useUserClassList(
    p.prefetchedUserData.memberClasses
  );

  // Get context from route segment
  const childSegment = useSelectedLayoutSegment(); // get current class id
  const childChildSegment = useSelectedLayoutSegments()[1]; // to get static pages
  const selectedPage =
    childSegment === "(static)" ? childChildSegment : childSegment;

  // check if current id is in userdata
  const router = useRouter();
  const [found, setFound] = useState<boolean | null>(null);
  const chidlsegments = useSelectedLayoutSegments();
  useEffect(() => {
    if (classlist === undefined) return;

    if (
      childSegment !== "(static)" &&
      !classlist.some((c) => c.classroomId === childSegment)
    ) {
      console.log(false);
      setFound(false);
    } else {
      console.log(true);
      setFound(true);
    }
  }, [childSegment, classlist]);

  // Apply Context Value
  const contextValue = {
    currentId: selectedPage ?? "dashboard",
    userData: p.prefetchedUserData,
  };

  // Transition when routing
  const [isPending, startTransition] = useTransition();

  return (
    <RoomContextProvider value={contextValue}>
      <div className={clsx("bg-dark1 w-20", "h-screen flex flex-col gap-4")}>
        <ScrollArea type="hidden">
          <ListGroup>
            {p.defaultRoom}
            {p.staticRooms}
          </ListGroup>

          <ListGroup>
            <ClassList list={classlist?.map((c) => c.classroom)} />
            <NavbarItemAddButton />
          </ListGroup>
        </ScrollArea>
      </div>

      {found === null ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div>Loading Classroom...</div>
        </div>
      ) : found === false ? (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
          <div className="font-semibold">Classroom not found!</div>
          <ModalButton
            label="Go back to Dashboard"
            onClick={() =>
              startTransition(() => router.push("/dashboard" as Route))
            }
            primary
          />
        </div>
      ) : (
        p.children
      )}
    </RoomContextProvider>
  );
}

export { useRoom };

function ListGroup(p: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2 p-4">{p.children}</ul>;
}

function ClassList(p: { list?: Classroom[] }) {
  return (
    <>
      {p.list?.map((classroom) => (
        <NavbarItem
          key={classroom.id}
          label={classroom.name}
          routeid={classroom.id}
          inviteID={classroom.inviteID}
          emoji={classroom.emoji}
        />
      ))}
    </>
  );
}

export type UserData = User & {
  memberClasses: (Member & {
    classroom: Classroom & {
      categories: Category[];
    };
  })[];
};
