'use client';
import 'swiper/css';

import { Container } from '@chakra-ui/react';
import Script from 'next/script';

import Header from '@/components/layout/header';
import { layoutConstants } from '@/constants/layout';

// TypeScript 환경이라면 Window 인터페이스 확장
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js" // 영어 버전 로케일
        strategy="lazyOnload"
        onLoad={() => {
          window.fbAsyncInit = function () {
            window.FB.init({
              appId: '1654128312237206',
              cookie: true,
              xfbml: true,
              version: 'v18.0',
            });
          };
        }}
      />
      <Header></Header>
      <Container maxW="7xl" pt={`${layoutConstants.headerHeight}px`}>
        {children}
      </Container>
    </>
  );
}
