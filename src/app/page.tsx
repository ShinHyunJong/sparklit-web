// app/page.tsx (or pages/index.tsx)
'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Separator,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {
  LuArrowRight,
  LuClipboardList,
  LuImage,
  LuLayers,
  LuMusic,
  LuPuzzle,
  LuSparkles,
} from 'react-icons/lu';

import { Nav } from '@/components/landing/Nav';

type FeatureCardProps = {
  keyword: string;
  bg: string;
  title: string;
  emphasize?: string;
  desc: string;
  icon: React.ReactNode;
};

const FeatureCard = ({
  keyword,
  bg,
  title,
  emphasize,
  desc,
  icon,
}: FeatureCardProps) => {
  return (
    <Box
      bg={bg}
      borderRadius="2xl"
      borderWidth="2px"
      borderColor="black"
      boxShadow="md"
      p={{ base: 5, md: 6 }}
    >
      {/* ✅ icon + keyword in ONE bordered row (Chakra v3 style Icon usage) */}
      <HStack
        w="fit-content"
        px={3}
        py={2}
        gap={2.5}
        borderWidth="2px"
        borderColor="black"
        borderRadius="xl"
        bg="whiteAlpha.800"
        boxShadow="sm"
      >
        <Icon>{icon}</Icon>
        <Text fontSize="xs" fontWeight="black" textTransform="uppercase">
          {keyword}
        </Text>
      </HStack>

      <Heading mt={4} size={{ base: 'sm', md: 'md' }} letterSpacing="-0.02em">
        {title}{' '}
        {emphasize ? (
          <Text as="span" fontWeight="black">
            {emphasize}
          </Text>
        ) : null}
      </Heading>

      <Text mt={2} fontSize={{ base: 'sm', md: 'md' }} color="blackAlpha.800">
        {desc}
      </Text>
    </Box>
  );
};

const Hero = () => {
  return (
    <Box bg="gray.50" pt={{ base: 10, md: 16 }} pb={{ base: 12, md: 18 }}>
      <Container maxW="6xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 10, lg: 12 }}
        >
          {/* Left */}
          <VStack align="flex-start" gap={5} flex="1" w="full">
            <HStack gap={2} flexWrap="wrap">
              <Box
                px={3}
                py={1}
                border="2px solid"
                borderColor="black"
                borderRadius="full"
                bg="white"
                boxShadow="sm"
              >
                <Text fontSize="sm" fontWeight="black">
                  Made for modern brides
                </Text>
              </Box>

              <Box
                px={3}
                py={1}
                border="2px solid"
                borderColor="black"
                borderRadius="full"
                bg="yellow.100"
                boxShadow="sm"
              >
                <Text fontSize="sm" fontWeight="black">
                  Elegant templates · Easy edits
                </Text>
              </Box>
            </HStack>

            <Heading as="h1" size={{ base: 'xl', md: '2xl' }} lineHeight="1.1">
              Wedding begins with invitation.
              <br />
              Make yours feel unforgettable.
            </Heading>

            <Text fontSize="md" color="gray.700" maxW="lg">
              Create a beautiful mobile invitation, add photos and music,
              collect RSVPs, and share one link—simple for you, lovely for your
              guests.
            </Text>

            <HStack gap={3} flexWrap="wrap">
              <Button
                size="lg"
                bg="black"
                color="white"
                _hover={{ bg: 'gray.900' }}
                rightIcon={
                  <Icon>
                    <LuArrowRight />
                  </Icon>
                }
              >
                Apply
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="black"
                _hover={{ bg: 'white' }}
                rightIcon={
                  <Icon>
                    <LuArrowRight />
                  </Icon>
                }
              >
                Apply
              </Button>
            </HStack>

            <Stack
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 2, sm: 6 }}
              pt={2}
              fontSize="sm"
              color="gray.600"
            >
              <Text>Live preview</Text>
              <Text>Unlimited edits</Text>
              <Text>RSVP tracking</Text>
            </Stack>
          </VStack>

          {/* Right mockup */}
          <Box
            flex="1"
            w="100%"
            maxW={{ base: '560px', lg: '440px' }}
            bg="white"
            borderRadius="3xl"
            boxShadow="xl"
            p={{ base: 5, md: 6 }}
            border="2px solid"
            borderColor="black"
          >
            <VStack gap={4} align="stretch">
              <Box
                h={{ base: '220px', md: '260px' }}
                borderRadius="2xl"
                border="2px solid"
                borderColor="black"
                bgGradient="linear(to-b, gray.100, gray.200)"
              />

              <Stack gap={2}>
                <Text fontWeight="black" fontSize="sm">
                  Live preview, like a real phone
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Edit details, reorder sections, and preview instantly before
                  you share.
                </Text>
              </Stack>

              <Button
                size="sm"
                bg="black"
                color="white"
                _hover={{ bg: 'gray.900' }}
                rightIcon={
                  <Icon>
                    <LuArrowRight />
                  </Icon>
                }
              >
                Apply
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const FeaturesSection = () => {
  return (
    <Box py={{ base: 14, md: 18 }} bg="#FFFDF5" id="features">
      <Container maxW="6xl">
        <VStack gap={3} textAlign="center" mb={{ base: 8, md: 10 }}>
          <Heading size={{ base: 'lg', md: 'xl' }} textTransform="uppercase">
            Why with us?
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700" maxW="2xl">
            Everything you need in one link—so you can focus on your big day.
          </Text>
        </VStack>

        {/* ✅ 6 cards: 1 col on mobile, 2 cols on md+ */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 5 }}>
          <FeatureCard
            keyword="Music"
            bg="#F7EDE1"
            title="Add music to your invitation."
            desc="Let love set the mood and make the page feel alive."
            icon={<LuMusic />}
          />

          <FeatureCard
            keyword="Photos"
            bg="#FFE680"
            title="Too many beautiful memories to share?"
            emphasize="Add up to 20 photos"
            desc="No worries—create a gallery your guests will actually enjoy."
            icon={<LuImage />}
          />

          <FeatureCard
            keyword="Easy to use"
            bg="#EAF7E8"
            title="A few clicks is all it takes."
            desc="Your elegant template does the magic—no design skills required."
            icon={<LuSparkles />}
          />

          <FeatureCard
            keyword="Customizable"
            bg="#E7ECF2"
            title="No more stress with your designer."
            desc="Adjust it to your taste and make it truly yours anytime."
            icon={<LuPuzzle />}
          />

          <FeatureCard
            keyword="RSVP"
            bg="#FFF6CC"
            title="Keep RSVP organized in one place."
            desc="Know who’s coming, follow up easily, and stay calm as the date gets closer."
            icon={<LuClipboardList />}
          />

          <FeatureCard
            keyword="All-in-one"
            bg="#FFE8E8"
            title="Everything inside one lovely invitation."
            emphasize="All-in-one link"
            desc="Photos, music, dress code, location, countdown, announcements, RSVP, and more."
            icon={<LuLayers />}
          />
        </SimpleGrid>

        <Flex justify="center" mt={{ base: 8, md: 10 }}>
          <Button
            size="lg"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.900' }}
            rightIcon={
              <Icon>
                <LuArrowRight />
              </Icon>
            }
          >
            Apply
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

const ReviewsSection = () => {
  return (
    <Box py={{ base: 14, md: 16 }} bg="gray.50" id="reviews">
      <Container maxW="6xl">
        <VStack gap={3} align="flex-start" mb={6}>
          <Text fontSize="sm" color="gray.600">
            Real reviews
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }}>
            What couples are saying
          </Heading>
          <HStack gap={4} fontSize="sm" color="gray.700">
            <Text>Clean design</Text>
            <Separator orientation="vertical" h="12px" />
            <Text>Easy edits</Text>
            <Separator orientation="vertical" h="12px" />
            <Text>Smooth RSVP</Text>
          </HStack>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, md: 6 }}>
          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontWeight="semibold" mb={2}>
              “So easy to customize”
            </Text>
            <Text fontSize="sm" color="gray.600">
              We updated details multiple times and it still looked elegant.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              Metro Manila
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontWeight="semibold" mb={2}>
              “Guests loved the experience”
            </Text>
            <Text fontSize="sm" color="gray.600">
              One link for everything made it easy for family and friends.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              Cebu
            </Text>
          </Box>

          <Box
            bg="white"
            borderRadius="2xl"
            p={5}
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <Text fontWeight="semibold" mb={2}>
              “RSVP tracking was a lifesaver”
            </Text>
            <Text fontSize="sm" color="gray.600">
              No more chasing messages. Everything stayed organized.
            </Text>
            <Text mt={3} fontSize="xs" color="gray.500">
              Davao
            </Text>
          </Box>
        </SimpleGrid>

        <Flex justify="center" mt={{ base: 8, md: 10 }}>
          <Button
            size="lg"
            bg="black"
            color="white"
            _hover={{ bg: 'gray.900' }}
            rightIcon={
              <Icon>
                <LuArrowRight />
              </Icon>
            }
          >
            Apply
          </Button>
        </Flex>
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
            © {new Date().getFullYear()} Sparklit. All rights reserved.
          </Text>
          <HStack gap={4}>
            <Text as="a" href="#terms" cursor="pointer">
              Terms
            </Text>
            <Text as="a" href="#privacy" cursor="pointer">
              Privacy
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
      <FeaturesSection />
      <ReviewsSection />
      <Footer />
    </Box>
  );
}
