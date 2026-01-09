'use client';

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { LuArrowRight, LuCircleCheck } from 'react-icons/lu';

const Hero = () => {
  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="gray.900"
      color="gray.50"
    >
      {/* ✅ Strong gradient overlays (clearly visible) */}
      <Box
        position="absolute"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        // Multi-layer background for strong gradient effect
        backgroundImage={`
          radial-gradient(circle at 18% 28%, rgba(253,252,251,0.14), rgba(0,0,0,0) 42%),
          radial-gradient(circle at 80% 45%, rgba(234,221,211,0.18), rgba(0,0,0,0) 46%),
          radial-gradient(circle at 55% 85%, rgba(209,194,180,0.14), rgba(0,0,0,0) 52%),
          linear-gradient(90deg, rgba(26,23,20,0.98) 0%, rgba(46,40,35,0.92) 45%, rgba(74,64,54,0.78) 100%)
        `}
      />

      {/* ✅ Subtle diagonal texture (kept light so gradients show) */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.08}
        pointerEvents="none"
        zIndex={0}
        backgroundImage="linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.00) 70%)"
      />

      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <Flex
          pt={{ base: 14, md: 20 }}
          pb={{ base: 14, md: 20 }}
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'stretch', lg: 'center' }}
          justify="space-between"
          gap={{ base: 12, lg: 10 }}
          position="relative"
          zIndex={1}
        >
          {/* LEFT COPY */}
          <VStack align="start" gap={6} flex="1" maxW={{ lg: '560px' }}>
            <HStack gap={3} flexWrap="wrap">
              <Badge
                bg="gray.800"
                color="gray.50"
                borderWidth="1px"
                borderColor="gray.700"
                px={3}
                py={1.5}
                borderRadius="full"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                FIRST K-WEDDING MOBILE INVITATION
              </Badge>

              <Badge
                bg="gray.800"
                color="gray.100"
                borderWidth="1px"
                borderColor="gray.700"
                px={3}
                py={1.5}
                borderRadius="full"
                fontWeight="semibold"
              >
                Mobile-first · RSVP-ready
              </Badge>
            </HStack>

            <Heading
              size={{ base: '2xl', md: '3xl' }}
              lineHeight="1.05"
              letterSpacing="-0.02em"
              color="gray.50"
            >
              WEDDING BEGINS
              <br />
              WITH INVITATION
            </Heading>

            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.100">
              One link. One beautiful page. <br /> One less thing to worry
              about.
            </Text>

            <Text fontSize="md" color="gray.200" maxW="lg">
              Launch fast with a polished template—then customize only what
              matters. Elegant by default, effortless for guests.
            </Text>

            {/* ✅ Single CTA button */}
            <HStack gap={3} pt={2} flexWrap="wrap">
              <Button
                size="lg"
                bg="gray.50"
                color="gray.900"
                _hover={{ bg: 'gray.100' }}
                rightIcon={
                  <Icon>
                    <LuArrowRight />
                  </Icon>
                }
              >
                View Sample
              </Button>
            </HStack>

            <HStack
              pt={2}
              color="gray.200"
              fontSize="sm"
              gap={4}
              flexWrap="wrap"
            >
              <HStack gap={2}>
                <Icon color="gray.100">
                  <LuCircleCheck />
                </Icon>
                <Text>Unlimited guests</Text>
              </HStack>
              <HStack gap={2}>
                <Icon color="gray.100">
                  <LuCircleCheck />
                </Icon>
                <Text>RSVP dashboard</Text>
              </HStack>
              <HStack gap={2}>
                <Icon color="gray.100">
                  <LuCircleCheck />
                </Icon>
                <Text>Mobile optimized</Text>
              </HStack>
            </HStack>
          </VStack>

          {/* RIGHT VISUAL: main invitation preview */}
          <Box
            flex="1"
            position="relative"
            minH={{ base: '420px', md: '520px' }}
          >
            <Box
              position="absolute"
              top={{ base: 10, md: 14 }}
              right={{ base: 0, md: 6 }}
              w={{ base: '100%', md: '520px' }}
              maxW={{ base: '520px', md: '520px' }}
              h={{ base: '380px', md: '460px' }}
              borderRadius="3xl"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.700"
              bg="gray.800"
              boxShadow="2xl"
            >
              <Image
                src="/mainBg.jpg"
                alt="Main background"
                fill
                priority
                style={{
                  objectFit: 'cover',
                }}
              />

              {/* Darken overlay so text/UI would be readable if added */}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, gray.900, transparent 55%)"
                opacity={0.8}
              />

              {/* Optional bottom pill */}
              <Box position="absolute" bottom={6} left={6} right={6}>
                <HStack
                  bg="gray.800"
                  borderWidth="1px"
                  borderColor="gray.700"
                  borderRadius="full"
                  px={4}
                  py={2}
                  w="fit-content"
                  gap={2}
                  opacity={0.95}
                >
                  <Box
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg="gray.50"
                    opacity={0.9}
                  />
                  <Text fontSize="sm" fontWeight="semibold" color="gray.50">
                    Live invitation preview
                  </Text>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
