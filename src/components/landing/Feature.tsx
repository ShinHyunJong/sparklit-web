'use client';

import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  LuBell,
  LuCalendar,
  LuCircleCheck,
  LuFlower2,
  LuGift,
  LuHeartHandshake,
  LuImage,
  LuMapPin,
  LuPartyPopper,
  LuShirt,
  LuUsers,
} from 'react-icons/lu';

import type { COMPONENT_MAP } from '@/app/page';
import { THEME } from '@/app/page';

import SectionShell from './SectionShell';

type FeatureItem = {
  key: keyof typeof COMPONENT_MAP;
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
};

const FeatureCard = ({ item }: { item: FeatureItem }) => {
  return (
    <Box
      bg={THEME.cardBg}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={THEME.cardBorder}
      p={{ base: 5, md: 6 }}
      boxShadow="sm"
    >
      <HStack align="start" gap={3}>
        <Box
          w="40px"
          h="40px"
          borderRadius="xl"
          bg="gray.100"
          borderWidth="1px"
          borderColor={THEME.cardBorder}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Icon color="gray.900">{item.icon}</Icon>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="md" color={THEME.text}>
            {item.title}
          </Text>
          <Text fontSize="sm" color={THEME.muted} mt={1}>
            {item.desc}
          </Text>
        </Box>
      </HStack>

      <Box mt={4} h="1px" bg="gray.200" />

      <Stack mt={4} gap={2}>
        {item.bullets.map((b, idx) => (
          <HStack key={`${String(item.key)}-b-${idx}`} gap={2} align="start">
            <Icon mt="2px" color="gray.400">
              <LuCircleCheck />
            </Icon>
            <Text fontSize="sm" color="gray.700">
              {b}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
};

const AllFeatures = () => {
  const items: FeatureItem[] = useMemo(
    () => [
      {
        key: 'RSVP',
        icon: <LuUsers />,
        title: 'RSVP',
        desc: 'Collect responses and manage attendance in one place.',
        bullets: [
          'Custom questions for guests (meal, companions, etc.)',
          'Dashboard summary for quick headcount checks',
          'Export responses when you need it',
          'Instant updates as guests respond',
        ],
      },
      {
        key: 'MonetaryGift',
        icon: <LuGift />,
        title: 'Monetary Gift',
        desc: 'Share gift details clearly and elegantly.',
        bullets: [
          'Add bank details or gift links',
          'Hide or show per version if needed',
          'Keep formatting consistent with the theme',
        ],
      },
      {
        key: 'Gallery',
        icon: <LuImage />,
        title: 'Gallery',
        desc: 'A clean photo experience guests actually enjoy.',
        bullets: [
          'Curated gallery layout',
          'Smooth swipe-friendly viewing',
          'Keeps the invitation lightweight and fast',
        ],
      },
      {
        key: 'Location',
        icon: <LuMapPin />,
        title: 'Location',
        desc: 'Make it effortless for guests to arrive on time.',
        bullets: [
          'Clear venue details',
          'Map-friendly layout for quick navigation',
          'Add notes for parking or entrances',
        ],
      },
      {
        key: 'Calendar',
        icon: <LuCalendar />,
        title: 'Calendar',
        desc: 'Help guests save your date instantly.',
        bullets: [
          'A clean schedule block',
          'Perfect for quick reminders',
          'Keeps important details visible',
        ],
      },
      {
        key: 'DressCode',
        icon: <LuShirt />,
        title: 'Dress Code',
        desc: 'Set expectations with a classy guideline.',
        bullets: [
          'Add theme colors or attire notes',
          'Keeps the vibe consistent for photos',
          'Short and easy for guests to understand',
        ],
      },
      {
        key: 'Greeting',
        icon: <LuPartyPopper />,
        title: 'Greeting',
        desc: 'A heartfelt message that feels personal.',
        bullets: [
          'Write a short story or a simple note',
          'Works beautifully with any template',
          'Easy to edit anytime',
        ],
      },
      {
        key: 'Notice',
        icon: <LuBell />,
        title: 'Notice',
        desc: 'Add important updates without confusion.',
        bullets: [
          'Share reminders and key notes',
          'Update anytime without resending PDFs',
          'Guests always see the latest information',
        ],
      },
      {
        key: 'Sponsor',
        icon: <LuHeartHandshake />,
        title: 'Sponsor',
        desc: 'Present family information with respect and clarity.',
        bullets: [
          'Structured layout for names and roles',
          'Consistent formatting across templates',
          'Easy to update for different versions',
        ],
      },
      {
        key: 'Entourage',
        icon: <LuFlower2 />,
        title: 'Entourage',
        desc: 'Introduce your wedding party elegantly.',
        bullets: [
          'Neat list layout',
          'Keeps the page readable',
          'Looks great on mobile screens',
        ],
      },
    ],
    [],
  );

  return (
    <Box pb={{ base: 12, md: 16 }} id="features">
      <SectionShell>
        <VStack gap={3} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Heading size={{ base: 'lg', md: 'xl' }} color={THEME.text}>
            All the features you need for a mobile invitation.
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={THEME.muted}
            maxW="2xl"
          >
            Use the same building blocks as your invitation components—keep the
            experience consistent from editing to sharing.
          </Text>
        </VStack>

        {/* ✅ No filters. Just list everything. */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 5 }}>
          {items.map((item) => (
            <FeatureCard key={String(item.key)} item={item} />
          ))}
        </SimpleGrid>
      </SectionShell>
    </Box>
  );
};

export default AllFeatures;
