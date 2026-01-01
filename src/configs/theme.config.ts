import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const colors = {
  gray: {
    50: { value: '#f7fafc' },
    100: { value: '#edf2f7' },
    200: { value: '#e2e8f0' },
    300: { value: '#cbd5e0' },
    400: { value: '#a0aec0' },
    500: { value: '#718096' },
    600: { value: '#4a5568' },
    700: { value: '#2d3748' },
    800: { value: '#1a202c' },
    900: { value: '#171923' },
  },
  brand: {
    50: { value: '#f4f8fc' },
    100: { value: '#e4edf9' },
    200: { value: '#93b9e7' },
    300: { value: '#4386d5' },
    400: { value: '#2c72c6' },
    500: { value: '#2868b5' },
    600: { value: '#255fa5' },
    700: { value: '#215695' },
    800: { value: '#1d4d85' },
    900: { value: '#163a65' },
  },
  pink: {
    50: { value: '#fff5f7' },
    100: { value: '#fde5e5' },
    200: { value: '#fbcdcd' },
    300: { value: '#f9b6b6' },
    400: { value: '#f79e9e' },
    500: { value: '#f58686' },
    600: { value: '#f36f6f' },
    700: { value: '#f15757' },
    800: { value: '#f04343' },
    900: { value: '#ee3131' },
  },
};

export const bgColorConfig = ['#f7f7f7', '#f79e9e66', '#f2ece6', '#b2708533'];
export const pointColorConfig = ['#000000', '#f79e9e', '#964b00', '#b27085'];

const fontMap = {
  en: {
    heading: {
      value: 'var(--font-figtree)',
    },
    body: {
      value: 'var(--font-figtree)',
    },
    tangerine: {
      value: 'var(--font-tangerine)',
    },
    crimsonPro: {
      value: 'var(--font-crimson-pro)',
    },
  },
};

export function customSystem() {
  const customConfig = defineConfig({
    theme: {
      tokens: {
        colors,
        fonts: fontMap.en, // Dynamically inject only fonts
      },
      semanticTokens: {
        colors: {
          brand: {
            solid: { value: colors.brand[500].value },
            contrast: { value: colors.brand[100].value },
            fg: { value: colors.brand[700].value },
            muted: { value: colors.brand[100].value },
            subtle: { value: colors.brand[200].value },
            emphasized: { value: colors.brand[300].value },
            focusRing: { value: colors.brand[500].value },
          },
        },
      },
    },
  });

  return createSystem(defaultConfig, customConfig);
}
