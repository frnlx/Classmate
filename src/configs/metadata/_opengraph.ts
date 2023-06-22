import { Metadata } from "next";
import { __appDescription, __appName, __img_thumbnail } from "./vars";

/**
 * List of Metadatas that are based on the openGraph Specification
 */
export const opengraphMetadata: Metadata = {
  openGraph: {
    // Four required properties for every page
    title: 'Classmate',
    type: 'website',
    // images: __img_thumbnail,
    images: {
      url: __img_thumbnail,
      width: 1200,
      height: 360,
    },
    description: __appDescription,
    // determiner: '',
    locale: 'en_US',
    alternateLocale: [],
    siteName: __appName,
  },
}