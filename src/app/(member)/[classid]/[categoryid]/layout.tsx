import { LayoutProps } from "@/types/next"
import { prisma } from "@/lib/db"
import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import { prefetch } from "@/api/caching/prefetch"
import { color } from "@/lib/logger/chalk"
import { getUserId } from "@/lib/auth"
import { ResourceList } from "../../../../components/classroom/category/resources/ResourceList"
import { HashStraight } from "@phosphor-icons/react"
import { Header } from "@/components/classroom/category/resources/Header"

export default async function CategoryPage({ children, params }: LayoutProps) {

  const classid = params!.classid as string
  const categoryid = params!.categoryid as string

  color.magenta('CategoryPage: '+categoryid)

  // const categorySectionsAndResources = await prefetch.category.sectionsAndResources(classid, categoryid)
  // const categoryData = await prefetch.category.data(classid, categoryid)

  // color.yellow("Category Section And Resouce Size")
  // color.yellow(categorySectionsAndResources.size)


  color.cyan("Find First Category Include Content, Check if Cateogiry part of Classroom and Member")
  const category = await prisma.category.findFirst({
    where: {
      id: categoryid,
      classroom: {
        id: classid,
        members: {
          some: {
            id: await getUserId()
          }
        }
      }
    }
  })
  if (!category) notFound()


  return (
    <div className="m-8 flex flex-col gap-4 w-full h-max">
      <Header title={ category.title } />
      {children}
    </div>
  )
}

export const dynamic = 'force-dynamic'