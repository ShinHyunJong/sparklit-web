import {
  Arizonia,
  Barriecito,
  Cormorant_Garamond,
  Crimson_Pro,
  Delius,
  Figtree,
  Great_Vibes,
  Josefin_Sans,
  Lora,
  Montserrat,
  Satisfy,
  Tangerine,
} from 'next/font/google';
import localFont from 'next/font/local';

export const fontOptions = [
  {
    name: 'Montserrat',
    value: 'montserrat',
  },
  {
    name: 'Cormorant Garamond',
    value: 'cormorantGaramond',
  },
  {
    name: 'Lora',
    value: 'lora',
  },
  {
    name: 'Delius',
    value: 'delius',
  },
  {
    name: 'Josefin Sans',
    value: 'josefinSans',
  },
  {
    name: 'Satisfy',
    value: 'satisfy',
  },
];

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

export const barriecito = Barriecito({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-barriecito',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant-garamond',
});

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lora',
});

export const delius = Delius({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-delius',
});

export const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-josefin-sans',
});

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
});

export const arizonia = Arizonia({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-arizonia',
});

export const satisfy = Satisfy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-satisfy',
});
