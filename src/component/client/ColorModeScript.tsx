'use client'

import { ColorModeScript, theme } from "@chakra-ui/react";

const ColorModeScriptClient = () => {
  return <ColorModeScript initialColorMode={theme.config.initialColorMode} />;
}
 
export default ColorModeScriptClient;