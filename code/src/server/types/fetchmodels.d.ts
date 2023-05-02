import { Category, Classroom, User } from "@prisma/client";

export type UserData = User & {
  classes: (Classroom & {
    categories: Category[]
  })[];
}

export type ClassroomData = Classroom & {
  members: User[];
}