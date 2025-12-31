'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider as JotaiProvider } from 'jotai';

import { useCustomSystem } from '@/configs/theme.config';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
const client = new QueryClient();
export const globalStore = createStore();

export function Provider(props: ColorModeProviderProps) {
  const system = useCustomSystem();

  return (
    <JotaiProvider store={globalStore}>
      <QueryClientProvider client={client}>
        <ChakraProvider value={system}>
          <ColorModeProvider {...props} defaultTheme="light" />
        </ChakraProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
