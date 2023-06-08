'use client'
import { useRoom } from "@/app/(member)/-Navbar/Navbar"
import { usePage } from "../../-Sidebar/Pages"
import { useCategoryData, useSectionList } from "@/api/client/category"
import SectionItem from "./SectionItem"
import ResourceItem from "../-Resources/ResourceItem"
import AddResourceButton from "../-Resources/AddButton"
import { CategoryIncludeSectionIncludeResource, Resource } from "@prisma/client"
import { SectionIncludeResources } from "@/api/db"
import { useSectionResources } from "@/api/client/resource"
import { RouteHandler } from "@/lib/route"
import { useEffect } from "react"

export default function SectionList(p: {
  prefetchedData: Map<string, SectionIncludeResources>
}) {
  const room = useRoom()
  const page = usePage()

  const { data, isLoading, error } = useSectionList(room.currentId, page.currentid, Array.from(p.prefetchedData.values()))

  useEffect(() => {
    console.log(data)
  }, [data])
  
  if (isLoading) return <>Loading</>
  if (error) return <>{ "An error occured: " + (error as any).message }</>


  return <div className="flex flex-col gap-6">
    { data?.map(section =>
      <SectionItem
        key={ section.id }
        label={ section.name }
      >

        <ResourceList
          prefetchedData={p.prefetchedData.get(section.id)?.post}
          sectionid={ section.id }
        />

        <AddResourceButton />
      </SectionItem>
    ) }
  </div>
}


function ResourceList(p: {
  sectionid: string
  prefetchedData?: Resource[]
}) {
  const room = useRoom()
  const page = usePage()
  const { data, isLoading, error } = useSectionResources(room.currentId, page.currentid, p.sectionid )

  return (
    <>
      {
        data?.map(resources =>
          <ResourceItem
            key={ resources.id }
            id={ resources.id }
            secid={ p.sectionid }
          />)
      }
    </>
  )
}


