import { Category, Classroom, Resource, Section, User } from "@prisma/client";

export type UserData = User & {
  classes: (Classroom & {
    categories: Category[]
  })[];
}

export type UserClassroomData = Classroom & {
  categories: Category[]
}

export type ClassroomData = Classroom & {
  categories: Category[]
}

export type CategoryData = (Category & {
  sections: (Section & {
    post: Resource[];
  })[];
})

export type SectionData = Section & {
  post: Resource[];
}