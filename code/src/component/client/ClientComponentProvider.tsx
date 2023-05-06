'use client';

import { ChakraProvider, ColorModeScript, ComponentStyleConfig, DarkMode, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '900',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: 'rgb(148 163 184)'
  }
}


export const theme = extendTheme({
  config,
  components: {
    FormLabel
  }
});

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