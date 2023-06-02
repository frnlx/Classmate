import { Resource } from "@prisma/client"

declare module '@prisma/client' {

  type CategoryIncludeSectionIncludeResource =
    Section & {
      post: Resource[]
    }

}
