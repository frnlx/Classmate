'use client'

import { CategoryData } from "@/server/types/fetchmodels";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react";
import Section from "./(Section)/Section";
import AddSectionButton from "./(Section)/SectionAddButton";
import ResourceItem from "./(Section)/(Resources)/ResourceItem";
import AddPostButton from "./(Section)/(Resources)/ResourceAddButton";
import { Routes } from "@/api/route-helper";
import { useCategoryData } from "@/api/client/category";



const DisplayCategoryPage = (p: { children: ReactNode, categoryid: string }) => {
  
  const { isLoading, error, data, isFetching, refetch } = useCategoryData(p.categoryid)

  // Write some skeleton here 👇
  if (isLoading) return <>Loading</>

  if (error) return <>{"An error occurred: " + (error as any).message}</>

  if (data) {
    return (
      <div className="m-8 flex flex-col gap-4 max-w-2xl h-max"> 
        <div className="flex flex-col gap-2 p-4 w-full max-w-2xl">
          <div className="text-slate-400 text-lg">{data.name}</div>
          <div className="text-slate-100 text-3xl font-bold ">{data.title}</div>
          <div className="text-slate-500 text-xs">{data.sections.reduce((count, innerArray) => count + innerArray.post.length, 0)} Posts in this category</div>
        </div>
        <div className="flex flex-col gap-6">
          {
            data?.sections.map(s =>
              <Section key={s.id} label={s.name} sectionid={s.id} posts={s.post} id={s.id}>
                {
                  s.post.map(r => <ResourceItem key={r.id} data={r} />)
                }
                <AddPostButton sectionid={s.id} categoryid={p.categoryid} onAdd={()=>refetch()} />
              </Section>)
          }
          <AddSectionButton categoryid={p.categoryid} />
        </div>
      </div>
    );
  }
  return <></>
}
 
export default DisplayCategoryPage;