import 'swiper/css';

import { Container } from '@chakra-ui/react';

import Header from '@/components/layout/header';
import { layoutConstants } from '@/constants/layout';

export default async function WorkspaceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
