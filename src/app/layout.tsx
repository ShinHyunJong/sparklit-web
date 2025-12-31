import 'react-quill-new/dist/quill.snow.css';
import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'react-day-picker/style.css';

import { Box } from '@chakra-ui/react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { crimsonPro, figtree, pretendard, tangerine } from '@/styles';

// dayjs.extend(advancedFormat);
import Head from './head';

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('title'),
    metadataBase: new URL('https://sparklit.co'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: '/',
      images: [
        {
          url: '/ogImage.png',
          width: 1200,
          height: 630,
          alt: 'Rovers OgImage',
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  const classNames =
    locale === 'en'
      ? `${figtree.variable} ${tangerine.variable} ${crimsonPro.variable}`
      : `${pretendard.variable}`;
  return (
    <html lang={locale} className={classNames} suppressHydrationWarning>
      <Head></Head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Toaster />
            <Box
              position="fixed"
              inset={0}
              w="100vw"
              h="100vh"
              overflow="auto"
              bg="gray.100"
            >
              {children}
            </Box>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
