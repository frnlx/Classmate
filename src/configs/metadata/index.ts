import { Metadata } from "next";
import { otherMetadata } from "./_otherspec";
import { iconsMetadata } from "./_icons";
import { appinfoMetadata } from "./_appinfo";
import { opengraphMetadata } from "./_opengraph";
import { twitterMetadata } from "./_twitter";
import { htmlMetadata } from "./_htmlspec";
import { __defaultTitle, __google_seo_verification, __templateTitle, __yandex_seo_verification } from "./vars";

/**
 * Default Metadata Fallback for Every Page
 */
export const rootMetadata: Metadata = {

  title: {
    template: __templateTitle,
    default: __defaultTitle,
  },

  ...htmlMetadata,
  ...otherMetadata,
  ...iconsMetadata,
  ...appinfoMetadata,
  ...opengraphMetadata,
  ...twitterMetadata,

  verification: {
    google: __google_seo_verification,
    yandex: __yandex_seo_verification,
  },

  formatDetection: {
    address: true,
    date: true,
    email: true,
    telephone: true,
    url: true,
  },

  // abstract: ''
  // archives: [''],
  // assets: [''],
  // bookmarks: [''],
  category: 'Web Application',
}