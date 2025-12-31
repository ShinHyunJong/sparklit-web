'use client';

import {
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Separator,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LuMenu } from 'react-icons/lu';

const navItems = [
  // { label: 'Mobile Invitation', href: '#mobile-invitation' },
  // { label: 'Wedding Video', href: '#wedding-video' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Support', href: '#support' },
];

export const Nav = () => {
  const router = useRouter();
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.100"
    >
      <Container maxW="6xl" py={3}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <HStack gap={2} minW="140px">
            <Box w="32px" h="32px" borderRadius="full" borderWidth="1px" />
            <Text fontWeight="bold" fontSize="lg">
              Sparklit
            </Text>
          </HStack>

          {/* Desktop nav */}
          <HStack
            as="nav"
            gap={6}
            display={{ base: 'none', md: 'flex' }}
            fontSize="sm"
            color="gray.700"
          >
            {navItems.map((item) => (
              <Text
                key={item.href}
                as="a"
                href={item.href}
                cursor="pointer"
                _hover={{ color: 'gray.900' }}
              >
                {item.label}
              </Text>
            ))}
          </HStack>

          {/* Desktop CTA */}
          <HStack gap={3} display={{ base: 'none', md: 'flex' }}>
            <Button
              onClick={() => router.push('/auth/login')}
              variant="ghost"
              size="sm"
            >
              Log in
            </Button>
            <Button
              size="sm"
              bg="black"
              color="white"
              _hover={{ bg: 'gray.900' }}
            >
              Create a Free Draft
            </Button>
          </HStack>

          {/* Mobile Drawer (Chakra v3 공식 패턴) */}
          <Drawer.Root placement="right">
            <Drawer.Backdrop />

            {/* Trigger: 모바일에서만 보이게 */}
            <Drawer.Trigger asChild>
              <IconButton
                aria-label="open menu"
                display={{ base: 'inline-flex', md: 'none' }}
                variant="ghost"
              >
                <LuMenu />
              </IconButton>
            </Drawer.Trigger>

            <Drawer.Positioner>
              <Drawer.Content bg="white">
                <Drawer.CloseTrigger />

                <Drawer.Header borderBottomWidth="1px" borderColor="gray.100">
                  <Drawer.Title>Menu</Drawer.Title>
                </Drawer.Header>

                <Drawer.Body>
                  <VStack align="stretch" gap={3} pt={2}>
                    <Stack gap={1}>
                      {navItems.map((item) => (
                        <Drawer.CloseTrigger asChild key={item.href}>
                          <Button
                            as="a"
                            href={item.href}
                            variant="ghost"
                            justifyContent="flex-start"
                          >
                            {item.label}
                          </Button>
                        </Drawer.CloseTrigger>
                      ))}
                    </Stack>

                    <Separator />

                    <VStack align="stretch" gap={2}>
                      <Drawer.CloseTrigger asChild>
                        <Button variant="outline">Log in</Button>
                      </Drawer.CloseTrigger>

                      <Drawer.CloseTrigger asChild>
                        <Button
                          bg="black"
                          color="white"
                          _hover={{ bg: 'gray.900' }}
                        >
                          Create a Free Draft
                        </Button>
                      </Drawer.CloseTrigger>
                    </VStack>
                  </VStack>
                </Drawer.Body>

                {/* 필요하면 Footer 쓰기 */}
                {/* <Drawer.Footer>...</Drawer.Footer> */}
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </Flex>
      </Container>
    </Box>
  );
};
