import { Crimson_Pro, Figtree, Tangerine } from 'next/font/google';
import localFont from 'next/font/local';

export const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
});

export const tangerine = Tangerine({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tangerine',
});

export const pretendard = localFont({
  src: '../app/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-crimson-pro',
});
