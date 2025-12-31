// app/page.tsx (or pages/index.tsx)
'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Footer } from 'react-day-picker';
import { LuArrowRight } from 'react-icons/lu';

import { Nav } from '@/components/landing/Nav';

const Hero = () => {
  return (
    <Box bg="gray.50" pt={{ base: 10, md: 16 }} pb={{ base: 14, md: 20 }}>
      <Container maxW="6xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 10, lg: 12 }}
        >
          {/* Left */}
          <VStack align="flex-start" gap={5} flex="1" w="full">
            <Text fontSize="sm" color="gray.700">
              Chosen by 50,000+ couples
            </Text>

            <Heading as="h1" size={{ base: 'xl', md: '2xl' }} lineHeight="1.15">
              A mobile invitation service
              <br />
              with unmatched quality
            </Heading>

            <Text fontSize="md" color="gray.600" maxW="lg">
              Try it first. Pay only when you love it. With tasteful designs and
              easy editing, anyone can finish in 10 minutes.
            </Text>

            <HStack gap={3} flexWrap="wrap">
              <Button
                size="lg"
                bg="black"
                color="white"
                _hover={{ bg: 'gray.900' }}
                rightIcon={<LuArrowRight size={18} />}
              >
                Create a Free Draft
              </Button>
              <Button size="lg" variant="outline">
                View Design Samples
              </Button>
            </HStack>

            {/* Bullets: on mobile, stack nicely */}
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 2, sm: 6 }}
              pt={2}
              fontSize="sm"
              color="gray.500"
            >
              <Text>Decide after trying</Text>
              <Text>Unlimited edits</Text>
              <Text>RSVP & auto stats</Text>
            </Stack>
          </VStack>

          {/* Right mockup */}
          <Box
            flex="1"
            w="100%"
            maxW={{ base: '520px', lg: '420px' }}
            bg="white"
            borderRadius="3xl"
            boxShadow="xl"
            p={{ base: 5, md: 6 }}
          >
            <VStack gap={4} align="stretch">
              <Box
                h={{ base: '200px', md: '220px' }}
                borderRadius="2xl"
                bgGradient="linear(to-b, gray.100, gray.200)"
              />
              <Stack gap={2}>
                <Text fontWeight="semibold" fontSize="sm">
                  Live preview
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Preview it like a real mobile screen and edit freely until
                  it’s perfect.
                </Text>
              </Stack>
              <Button
                size="sm"
                bg="black"
                color="white"
                _hover={{ bg: 'gray.900' }}
              >
                Generate with my wedding info
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const WhySection = () => {
  return (
    <Box py={{ base: 14, md: 16 }} id="mobile-invitation">
      <Container maxW="6xl">
        <VStack gap={3} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Text fontSize="sm" color="gray.500">
            Why do so many couples choose us?
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }}>
            Start with a free draft,
            <br />
            pay only when you love it
          </Heading>
          <Text fontSize="sm" color="gray.600" maxW="lg">
            Create your draft for free. Pay only when you’re fully satisfied.
            Unlimited edits are available until the big day.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 8 }}>
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={6}
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              100% free draft
            </Text>
            <Text fontSize="sm" color="gray.600">
              Sign up and enter your wedding details—your personalized mobile
              invitation is ready right away.
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={6}
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              Unlimited edits, anytime
            </Text>
            <Text fontSize="sm" color="gray.600">
              Edit text, photos, bank info, and all details without limits until
              your wedding day.
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={6}
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              RSVP & auto analytics
            </Text>
            <Text fontSize="sm" color="gray.600">
              Track attendance at a glance, export to Excel, and plan seating
              and headcount with ease.
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const FreeTrialSection = () => {
  return (
    <Box py={{ base: 14, md: 16 }}>
      <Container maxW="5xl">
        <Box
          borderRadius="3xl"
          bg="black"
          color="white"
          px={{ base: 6, md: 12 }}
          py={{ base: 8, md: 10 }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            gap={6}
          >
            <VStack align="flex-start" gap={3} w="full">
              <Heading size={{ base: 'md', md: 'md' }}>
                Make it first,
                <br />
                pay only if you love it.
              </Heading>
              <Text fontSize="sm" color="whiteAlpha.800" maxW="lg">
                If you have photos and basic wedding details, you can finish
                your mobile invitation today.
              </Text>

              <Button
                size="lg"
                variant="solid"
                bg="white"
                color="black"
                _hover={{ bg: 'gray.100' }}
                rightIcon={<LuArrowRight size={18} />}
              >
                Create a free draft now
              </Button>
            </VStack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

const ReviewsSection = () => {
  return (
    <Box py={{ base: 14, md: 16 }} bg="gray.50" id="reviews">
      <Container maxW="6xl">
        <VStack gap={3} align="flex-start" mb={6}>
          <Text fontSize="sm" color="gray.500">
            Real reviews
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }}>
            What customers are saying
          </Heading>
          <HStack gap={4} fontSize="sm" color="gray.600">
            <Text>Rating 4.9 / 5.0</Text>
            <Separator orientation="vertical" h="12px" />
            <Text>Hundreds of verified reviews</Text>
          </HStack>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 6 }}>
          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              “The photo and animation quality is insane”
            </Text>
            <Text fontSize="sm" color="gray.600">
              I made it by myself, but it looked like it was produced by a
              studio. Everyone complimented it.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              D-60 / Seoul wedding
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              “The RSVP stats alone make it worth it”
            </Text>
            <Text fontSize="sm" color="gray.600">
              Exporting attendance to Excel made seating and headcount planning
              so much easier. Instant alerts are super helpful too.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              D-30 / Out-of-town wedding
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
          >
            <Text fontWeight="semibold" mb={2}>
              “Love that we can make separate versions”
            </Text>
            <Text fontSize="sm" color="gray.600">
              We made a parents’ version and a friends’ version. Everyone said
              it was thoughtful— and the value is amazing.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              D-90 / Small wedding
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box borderTopWidth="1px" borderColor="gray.100" py={8}>
      <Container maxW="6xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap={4}
          fontSize="xs"
          color="gray.500"
        >
          <Text>
            © {new Date().getFullYear()} YourMood, Inc. All rights reserved.
          </Text>
          <HStack gap={4}>
            <Text as="a" href="#terms" cursor="pointer">
              Terms
            </Text>
            <Text as="a" href="#privacy" cursor="pointer">
              Privacy
            </Text>
            <Text as="a" href="#support" cursor="pointer">
              Support
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default function LandingPage() {
  return (
    <Box bg="white" color="gray.900">
      <Nav />
      <Hero />
      <WhySection />
      <FreeTrialSection />
      <ReviewsSection />
      <Footer />
    </Box>
  );
}
