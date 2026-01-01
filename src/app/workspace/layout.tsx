'use client';
import 'swiper/css';

import { Container } from '@chakra-ui/react';

import Header from '@/components/layout/header';
import { layoutConstants } from '@/constants/layout';

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      <Container maxW="7xl" pt={`${layoutConstants.headerHeight}px`}>
        {children}
      </Container>
    </>
  );
}
