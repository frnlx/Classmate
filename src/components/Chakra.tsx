'use client';

import { CacheProvider } from '@chakra-ui/next-js';
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

export function ClientComponentProvider(p: {
  children: ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {p.children}
      </ChakraProvider>
    </CacheProvider>
  );
}

export function ColorModeScriptClient () {
  return <ColorModeScript initialColorMode={theme.config.initialColorMode} />;
}
