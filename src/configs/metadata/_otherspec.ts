import { Metadata } from "next";
import { __creator, __publisher } from "./vars";

/**
 * List of Metadatas that are Standard Metadata Names 
 * defined in other Specification
 */
export const otherMetadata: Metadata = {
  // viewport: { width: "device-width", initialScale: 1 },
  creator: __creator,
  publisher: __publisher,
  // robots: {},
}