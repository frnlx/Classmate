'use client';

import { ChakraProvider, ColorModeScript, DarkMode, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({ config });

const ClientComponentProvider = (p: { children: ReactNode }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
          {p.children}
      </ChakraProvider>
    </>
  );
}
 
export default ClientComponentProvider;