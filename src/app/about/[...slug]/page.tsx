import { metadata } from "@/lib/metadata";
import { PageProps } from "@/types/next"



export default async function AboutSlugPage({ params, searchParams }: PageProps) {
  return (
    <div>Hello</div>
  )
}
// https://nextjs.org/docs/app/api-reference/file-conventions/page

export const generateMetadata = metadata({
  title: 'Test'
});