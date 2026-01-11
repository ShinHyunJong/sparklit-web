'use client';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createStore, Provider as JotaiProvider } from 'jotai';
import { useEffect } from 'react';

import { getUserTimezone, initDayjsTimezone } from '@/configs/dayjs.config';
import { customSystem } from '@/configs/theme.config';

import { Toaster } from './toaster';

const client = new QueryClient();
export const globalStore = createStore();
const system = customSystem();

export function Provider(props: { children: React.ReactNode }) {
  useEffect(() => {
    initDayjsTimezone();
    const tz = getUserTimezone();
    document.cookie = `spk_tz=${encodeURIComponent(
      tz,
    )}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  return (
    <JotaiProvider store={globalStore}>
      <QueryClientProvider client={client}>
        <ChakraProvider value={system}>
          <Toaster></Toaster>
          <Box
            position="fixed"
            inset={0}
            w="100vw"
            h="100svh"
            overflowX="hidden"
            overflowY="auto"
            bg="gray.100"
          >
            {props.children}
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </JotaiProvider>
  );
}
