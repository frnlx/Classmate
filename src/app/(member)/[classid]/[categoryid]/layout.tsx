import { LayoutProps } from "@/types/next"
import { prisma } from "@/lib/db"
import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import SectionList from "./-Section/SectionList"
import { prefetch } from "@/api/caching/prefetch"
import { color } from "@/lib/logger/chalk"

export default async function CategoryPage({ children, params }: LayoutProps) {

  const classid = params!.classid as string
  const categoryid = params!.categoryid as string

  color.magenta('CategoryPage: '+categoryid)

  // const categorySectionsAndResources = await prefetch.category.sectionsAndResources(classid, categoryid)
  // const categoryData = await prefetch.category.data(classid, categoryid)

  // color.yellow("Category Section And Resouce Size")
  // color.yellow(categorySectionsAndResources.size)

  return (
    <div className="m-8 flex flex-col gap-4 max-w-2xl h-max">

      {/* <Header
        name={ categoryData.name }
        title={ categoryData.title }
      /> */}
      
      {/* <SectionList
        prefetchedData={ categorySectionsAndResources }
      /> */}

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