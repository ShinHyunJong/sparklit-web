// app/page.tsx (or pages/index.tsx)
'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';

import AllFeatures from '@/components/landing/Feature';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Highlight from '@/components/landing/Highlight';
import { Nav } from '@/components/landing/Nav';
import Review from '@/components/landing/Review';

/**
 * Keep your component map keys exactly as your product uses them.
 * (These are the features shown in the landing “All features” section.)
 */
export const COMPONENT_MAP: Record<string, JSX.Element> = {
  Greeting: <></>,
  Gallery: <></>,
  Location: <></>,
  DressCode: <></>,
  Calendar: <></>,
  RSVP: <></>,
  Notice: <></>,
  Sponsor: <></>,
  Entourage: <></>,
  MonetaryGift: <></>,
};

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
