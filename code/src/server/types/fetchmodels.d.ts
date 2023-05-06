import { Category, Classroom, Resource, Section, User } from "@prisma/client";

export type UserData = User & {
  classes: (Classroom & {
    categories: Category[]
  })[];
}

export type ClassroomData = Classroom & {
  members: User[];
}

export type CategoryData = (Category & {
  sections: (Section & {
    post: Resource[];
  })[];
})