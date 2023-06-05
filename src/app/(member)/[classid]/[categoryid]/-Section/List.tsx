'use client'

import { useRoom } from "@/app/(member)/-Navbar/Navbar"
import { usePage } from "../../-Sidebar/Pages"
import { useCategoryData } from "@/api/client/category"
import SectionItem from "./Item"
import ResourceItem from "../-Resources/Item"
import AddResourceButton from "../-Resources/AddButton"

export default function SectionList() {
  const room = useRoom()
  const page = usePage()

  const { data, isLoading, error } = useCategoryData(room.currentId ?? '', page.currentid)

  if (isLoading) return <>Loading</>
  if (error) return <>{"An error occured: " + (error as any).message}</>
  
  return <>
    { data?.sections.map(section =>
    <SectionItem
      key={section.id}
      label={section.name}
    >
      {section.post.map(post =>
        <ResourceItem
          key={post.id}
          secid={section.id}
          id={post.id}
        />)}
      <AddResourceButton />
    </SectionItem>
    ) }
  </>
}