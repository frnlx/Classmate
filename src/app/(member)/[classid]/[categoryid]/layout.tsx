import { LayoutProps } from "@/types/next"
import { prisma } from "@/lib/db"
import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import SectionList from "./-Section/SectionList"
import { prefetch } from "@/api/caching/prefetch"
import { color } from "@/lib/logger/chalk"
import { getUserId } from "@/lib/auth-helper"

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
    },
    include: {
      sections: {
        include: {
          post: true
        }
      }
    }
  })
  if (!category) notFound()


  return (
    <div className="m-8 flex flex-col gap-4 max-w-2xl h-max">

      <Header
        name={ category.name }
        title={ category.title }
      />
      
      <SectionList
        // prefetchedData={ categorySectionsAndResources }
        prefetchedDataArray={ category.sections }
      />

    </div>
  )
}

export const dynamic = 'force-dynamic'



function Header(p: {
  name: string
  title: string
}) {
  return (
    <header className="flex flex-col gap-2 p-4 w-full max-w-2xl">
      <div className="text-slate-400 text-lg">{ p.name }</div>
      <div className="text-slate-100 text-3xl font-bold ">{ p.title }</div>
      {/* <div className="text-slate-500 text-xs">{categoryData.sections.reduce((count, innerArray) => count + innerArray.post.length, 0)} Posts in this category</div> */ }
    </header>
  )
}