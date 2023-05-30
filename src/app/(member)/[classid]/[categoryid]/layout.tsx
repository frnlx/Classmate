import { LayoutProps } from "@/types/next"
import { prisma } from "@/lib/db"
import { Category } from "@prisma/client"
import { notFound } from "next/navigation"
import SectionList from "./-Section/List"

export default async function SidebarLayout({ children, params }: LayoutProps) {

  let categoryData: Category | null = null;
  let categoryID = params?.categoryid as string
  if(categoryID)
    categoryData = await prisma.category.findUnique({ where: { id: categoryID } })

  if(!categoryData) notFound()
  
  return (
    <>
      <div className="m-8 flex flex-col gap-4 max-w-2xl h-max">
        <div className="flex flex-col gap-2 p-4 w-full max-w-2xl">
          <div className="text-slate-400 text-lg">{categoryData.name}</div>
          <div className="text-slate-100 text-3xl font-bold ">{categoryData.title}</div>
          {/* <div className="text-slate-500 text-xs">{categoryData.sections.reduce((count, innerArray) => count + innerArray.post.length, 0)} Posts in this category</div> */}
        </div>
        <div className="flex flex-col gap-6">
          <SectionList />
        </div>
      </div>
      {children}
    </>
    
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/layout