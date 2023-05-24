import { getFullPath } from "@/lib/server-functions"
import { PageProps } from "@/types/next"
import { Metadata, ResolvingMetadata } from "next"

type PageMetadata = {
  title: string
}
type NextGenerateMetadataFunction = (
  { params, searchParams }?: PageProps,
  parent?: ResolvingMetadata,
) => Promise<Metadata>

/**
 * Function that adds necessary deviation from the default metadata.
 * @param param 
 * @returns 
 */
function generateDefaultAppMetadata(param: PageMetadata): Metadata {
  const url = getFullPath() ?? ''
  return {
    title: param.title,
    twitter: { title: param.title },
    openGraph: { title: param.title, url },
    appLinks: { web: { url } },
  }
}


/**
 * Wrapper Function that produces 'generateMetadata' function for nextjs.
 * Only to be used in server page or layout.
 * @param param 
 * @returns 
 */
export function metadata(param: PageMetadata,
): NextGenerateMetadataFunction {
  return async () => {
    return generateDefaultAppMetadata({ title: param.title });
  }
}