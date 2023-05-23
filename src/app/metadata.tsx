import { Metadata } from "next";

/**
 * Root Metadata of the Whole Applicatio 
 * (Landing Page and App included.)
 */

const appName = 'Classmate'
const appDescription = 'A new tool that powers up your classrooms. Gamify your learning and teaching experience'

export const rootMetadata: Metadata = {

  title: {
    template: '%s | Classmate', // todo: Generate title: '' per page/document
    default: 'Classmate | 🚀 Power Up Your Class',
  },

  // Standard Metadata Names defined in the HTML Specification
  description: appDescription,
  applicationName: appName,
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
     { media: "(prefers-color-scheme: dark)", color: "#00B876" },
     { media: "(prefers-color-scheme: light)", color: "#005949" }
  ],
  colorScheme: 'dark',



  // Standard Metadata Names defined in other Specification
  // viewport: { width: "device-width", initialScale: 1 },
  creator: 'Alfonsus Ardani',
  // publisher: '',
  // robots: {},
  // alternates: {}
  // icons: {}
  // manifest: ''
  openGraph: { // todo: Generate title per page/document
    // Four required properties for every page
    title: 'Classmate', // todo: Generate title per page/document
    type: 'website', 
    // images: '', // todo: Generate image per page/document
    images: '', // todo: add thumbnail image
    url: '', // todo: Generate image per page/document

    description: appDescription, // todo: Override with blank per page/document
    // determiner: '',
    locale: 'en_US',      
    alternateLocale: [], 
    siteName: appName,
  },

  twitter: {
    card: 'summary_large_image',
    site: '', // none coz no twitter handle
    description: appDescription,
    title: '', // todo: add title (use page title per page)
    images: '', // todo: add thumbnail image

  },

  verification: {
    // google: '',
    // yandex: ''
  },

  appleWebApp: { // todo
    capable: undefined,
    startupImage: '', 
    title: '',
    statusBarStyle: 'black',
  },

  formatDetection: {
    address: true,
    date: true,
    email: true,
    telephone: true,
    url: true,
  },

  // itunes: {}

  // abstract: ''

  appLinks: { // don't have coz not using apps
    android: undefined,
    ios: undefined,
    ipad: undefined,
    iphone: undefined,
    web: {
      url: '' // todo
    },
    windows: undefined,
    windows_phone: undefined,
    windows_universal: undefined,
  },

  // archives: [''],
  // assets: [''],
  // bookmarks: [''],
  // category: ''
  

}