import { Metadata } from "next";
import { __appName, __img_apple, __img_icon, __img_icon_whitebg, __img_shortcut, __link_manifest, __msapplicationTileColor } from "./vars";

/**
 * List of Metadatas are related to icons
 * such as favicon, icon, and apple-icon
 */
export const iconsMetadata: Metadata = {
  icons: {
    icon: __img_icon,
    shortcut: __img_shortcut,
    apple: __img_apple,
    other: [
      { // ! not working
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg" color="#5bbad5',
      },
    ]
  },
  other: {
    'msapplication-TileColor': __msapplicationTileColor,
  },
  appleWebApp: {
    capable: undefined,
    startupImage: __img_icon_whitebg,
    title: __appName,
    statusBarStyle: 'black',
  },
  manifest: __link_manifest,
}