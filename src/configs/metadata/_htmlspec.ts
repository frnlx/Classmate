import { Metadata } from "next";
import { __appDescription, __appName, __darkBrancColor, __lightBrandColor } from "./vars";

/**
 * List of Metadatas that are Standard Metadata Names 
 * defined in the HTML Specification
 */
export const htmlMetadata:Metadata = {
  description: __appDescription,
  applicationName: __appName,
  authors: [
    { name: 'Alfonsus Ardani', url: "https://github.com/alfonsusac" },
    { name: 'Aileen' },
    { name: 'Eugene Patrick' },
  ],
  generator: 'Next.js',
  keywords: [
    'Classmate', 'Free online classroom', 'Gamified classroom',
    'Gamified online classroom', 'Classroom tool', 'Classroom software',
    'Gamified classroom software'
  ],
  referrer: 'strict-origin-when-cross-origin',
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: __lightBrandColor },
    { media: "(prefers-color-scheme: light)", color: __darkBrancColor }
  ],
  colorScheme: 'dark',
}