import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuPalette, LuScrollText, LuSparkles } from 'react-icons/lu';

import { THEME } from '@/app/page';

import SectionShell from './SectionShell';

const Review = () => {
  return (
    <Box pb={{ base: 12, md: 16 }} id="reviews">
      <SectionShell>
        <VStack gap={3} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Text fontSize="sm" color={THEME.muted} fontWeight="semibold">
            Reviews
          </Text>
          <Heading size={{ base: 'lg', md: 'xl' }} color={THEME.text}>
            Loved for clarity and elegance
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color={THEME.muted}
            maxW="2xl"
          >
            Clean layouts, smooth editing, and a guest-friendly experience.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 5 }}>
          {[
            {
              title: '“Everything looked consistent.”',
              body: 'We edited multiple times and the design stayed elegant the whole time.',
              meta: 'Metro Manila',
              icon: <LuPalette />,
            },
            {
              title: '“Guests found everything easily.”',
              body: 'The layout made it easy for family and friends to follow details.',
              meta: 'Cebu',
              icon: <LuScrollText />,
            },
            {
              title: '“RSVP saved us so much time.”',
              body: 'No more chasing messages. We stayed organized from start to finish.',
              meta: 'Davao',
              icon: <LuSparkles />,
            },
          ].map((r, i) => (
            <Box
              key={`review-${i}`}
              bg="white"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={THEME.cardBorder}
              p={6}
              boxShadow="sm"
            >
              <HStack gap={3} mb={3}>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="xl"
                  bg="#F6F1EC"
                  borderWidth="1px"
                  borderColor={THEME.cardBorder}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon color="#2F2F2F">{r.icon}</Icon>
                </Box>
                <Text fontWeight="bold" color={THEME.text}>
                  {r.title}
                </Text>
              </HStack>
              <Text fontSize="sm" color={THEME.muted}>
                {r.body}
              </Text>
              <Text mt={3} fontSize="xs" color="#9CA3AF">
                {r.meta}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </SectionShell>
    </Box>
  );
};

export default Review;
