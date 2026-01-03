import 'react-quill-new/dist/quill.snow.css';
import './globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'react-day-picker/style.css';

import { Provider } from '@/components/ui/provider';
import { barriecito, crimsonPro, figtree, tangerine } from '@/styles';

// dayjs.extend(advancedFormat);
import Head from './head';

export async function generateMetadata({ params }: any) {
  return {
    title: 'Sparklit',
    metadataBase: new URL('https://sparklit.co'),
    description: 'Sparklit description',
    openGraph: {
      title: 'Sparklit',
      description: 'Sparklit description',
      url: '/',
      images: [
        {
          url: '/ogImage.jpg',
          width: 1200,
          height: 630,
          alt: 'SparklitOgImage',
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
  const classNames = `${figtree.variable} ${tangerine.variable} ${crimsonPro.variable} ${barriecito.variable}`;
  return (
    <html lang="en" className={classNames} suppressHydrationWarning>
      <Head></Head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
