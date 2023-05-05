'use client'

import { Routes } from "@/component/lib/route-helper";
import { CategoryData } from "@/server/types/fetchmodels";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react";
import Section from "./(section)/Section";
import AddSectionButton from "./(section)/SectionAddButton";



const DisplayCategoryPage = (p: { children: ReactNode, categoryid: string }) => {
  
  const fetchCategoryData = async () => {
    const res = await axios.get(Routes.CategoryInfo(p.categoryid));
    return res.data
  }

  const { isLoading, error, data, isFetching } = useQuery<CategoryData>({
    queryKey: [`category:${p.categoryid}`],
    queryFn: fetchCategoryData
  })
  // Write some skeleton here 👇
  if (isLoading) return <>Loading</>

  if (error) return <>{"An error occurred: " + (error as any).message}</>

  if (data) {
    return (
      <>
        <div className="flex flex-col gap-2 p-4 w-full max-w-2xl">
          <div className="text-slate-400 text-lg">{data.name}</div>
          <div className="text-slate-100 text-3xl font-bold ">{data.title}</div>
          <div className="text-slate-500 text-xs">{data.sections.reduce((count, innerArray) => count + innerArray.post.length, 0)} Posts in thsi category</div>
        </div>
        {
          data?.sections.map(s =>
            <Section key={s.id} label={s.name} sectionid={s.id}>
              {
                s.post.map(p => <div key={p.id}>Posts</div>)
              }
            </Section>)
        }
        <AddSectionButton categoryid={p.categoryid} />
      </>
    );
  }
  return <></>
}
 
export default DisplayCategoryPage;