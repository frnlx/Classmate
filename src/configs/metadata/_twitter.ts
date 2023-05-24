import { Metadata } from "next";
import { __appDescription, __appName, __app_twitter_handle, __img_thumbnail } from "./vars";

/**
 * List of Metadatas that are based on the openGraph Specification
 */
export const twitterMetadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    site: __app_twitter_handle, // none coz no twitter handle
    description: __appDescription,
    // title: '', (use page title per page)
    images: __img_thumbnail,
  },
}