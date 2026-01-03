import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

export const colors = {
  gray: {
    50: { value: '#fdfcfb' }, // 더 밝은 미색 (거의 화이트에 가까운 배경용)
    100: { value: '#f7f5f2' }, // 확실히 구분되는 연한 베이지 배경
    200: { value: '#eaddd3' }, // 요소 구분용 (보더, 비활성 버튼)
    300: { value: '#d1c2b4' }, // 대비가 시작되는 지점
    400: { value: '#a39281' }, // 중간 톤
    500: { value: '#7d6e5d' }, // 메인 그레이 (가장 중립적인 따뜻함)
    600: { value: '#635649' }, // 텍스트 가독성 시작
    700: { value: '#4a4036' }, // 본문 텍스트용 (깊은 브라운 그레이)
    800: { value: '#2e2823' }, // 매우 어두운 텍스트
    900: { value: '#1a1714' }, // 거의 검은색에 가까운 강조색
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
    barriecito: {
      value: 'var(--font-barriecito)',
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
