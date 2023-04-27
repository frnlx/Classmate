import { Classroom, User } from "@prisma/client";

export type UserData = User & {
  classes: Classroom[];
}

export type ClassroomData = Classroom & {
  members: User[];
}