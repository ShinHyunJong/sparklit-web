'use client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider as JotaiProvider } from 'jotai';

import { customSystem } from '@/configs/theme.config';

const client = new QueryClient();
export const globalStore = createStore();
const system = customSystem();

export function Provider(props: { children: React.ReactNode }) {
  return (
    <JotaiProvider store={globalStore}>
      <QueryClientProvider client={client}>
        <ChakraProvider value={system}>
          <Box
            position="fixed"
            inset={0}
            w="100vw"
            h="100vh"
            overflow="auto"
            bg="gray.100"
          >
            {props.children}
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
