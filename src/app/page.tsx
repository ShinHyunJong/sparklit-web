import { Box } from '@chakra-ui/react';
import React from 'react';

import AllFeatures from '@/components/landing/Feature';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Highlight from '@/components/landing/Highlight';
import { Nav } from '@/components/landing/Nav';
import Review from '@/components/landing/Review';

export const THEME = {
  pageBg: '#F7F3EF', // warm beige
  cardBg: '#FFFFFF',
  cardBorder: '#E7E0DA',
  muted: '#6B7280',
  text: '#111827',
};

export default function LandingPage() {
  return (
    <Box bg={THEME.pageBg} color={THEME.text}>
      <Nav />
      <Hero />
      <Highlight />
      <AllFeatures />
      <Review />
      <Footer />
    </Box>
  );
}
