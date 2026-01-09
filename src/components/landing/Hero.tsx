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
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuArrowRight, LuCircleCheck } from 'react-icons/lu';

const Hero = () => {
  // ✅ External images (Unsplash)
  // - w/auto=format&fit=crop keeps them stable
  // - If your site has a strict CSP blocking remote images, you must allow https://images.unsplash.com
  const IMG_MAIN =
    'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const IMG_TOP =
    'https://images.unsplash.com/photo-1529634897861-1aa546dc6a4a?auto=format&fit=crop&w=900&q=80';
  const IMG_BOTTOM =
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80';

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="gray.900"
      color="gray.50"
    >
      {/* warm-gray gradient overlays */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-r, gray.900, gray.800 55%, gray.700)"
        opacity={0.85}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 25% 35%, gray.700, transparent 55%)"
        opacity={0.35}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 75% 55%, gray.600, transparent 60%)"
        opacity={0.22}
        pointerEvents="none"
      />

      {/* subtle diagonal texture (kept) */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.18}
        pointerEvents="none"
        backgroundImage="linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.00) 70%)"
      />

      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <Flex
          pt={{ base: 14, md: 20 }}
          pb={{ base: 14, md: 22 }}
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

            {/* ✅ Buttons (only one) */}
            <HStack gap={3} pt={2} flexWrap="wrap">
              <Button
                size="lg"
                bg="gray.50"
                color="gray.900"
                _hover={{ bg: 'gray.100' }}
              >
                View Sample
                <Icon>
                  <LuArrowRight />
                </Icon>
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

          {/* RIGHT VISUAL: stacked invitation previews */}
          <Box
            flex="1"
            position="relative"
            minH={{ base: '420px', md: '520px' }}
          >
            {/* Main big preview card */}
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
              {/* ✅ Use <img> instead of background-image */}
              <Image
                src={IMG_MAIN}
                alt="Invitation preview"
                position="absolute"
                inset={0}
                w="100%"
                h="100%"
                objectFit="cover"
              />

              {/* darken overlay for readability */}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-t, gray.900, transparent 55%)"
                opacity={0.8}
              />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
