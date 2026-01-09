'use client';

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  Portal,
  Separator,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LuMenu } from 'react-icons/lu';

import { layoutConstants } from '@/constants/layout';
import { useAuth } from '@/hooks/auth';

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const isAuthed = !!user;
  const isLanding = pathname === '/';

  return (
    <Box
      as="header"
      w="100vw"
      minH={`${layoutConstants.headerHeight}px`}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position={isLanding ? 'sticky' : 'fixed'}
      top={0}
      zIndex={10}
      backdropFilter={isAuthed && !isLanding ? 'blur(7px)' : 'none'}
      bg={isAuthed && !isLanding ? 'whiteAlpha.700' : 'white'}
      borderBottomWidth={isLanding ? '1px' : 0}
      borderColor="gray.100"
    >
      <Container maxW="7xl">
        <Flex justifyContent="space-between" alignItems="center">
          <HStack
            as={Link}
            href={isAuthed ? '/studio' : '/'}
            gap={2}
            minW="140px"
            cursor="pointer"
          >
            <Heading fontSize="2xl" fontFamily="barriecito">
              Sparklit
            </Heading>
          </HStack>

          {isLoading ? (
            <Spinner size="sm" />
          ) : isAuthed ? (
            <Flex gap={4}>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <AvatarGroup cursor="pointer">
                    <Avatar.Root>
                      <Avatar.Fallback />
                      <Avatar.Image />
                    </Avatar.Root>
                  </AvatarGroup>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        onClick={() => router.push('/studio')}
                        cursor="pointer"
                        value="studio"
                      >
                        Studio
                      </Menu.Item>
                      <Menu.Item
                        onClick={logout}
                        cursor="pointer"
                        value="signOut"
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Flex>
          ) : (
            <>
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
                  View Sample
                </Button>
              </HStack>

              <Drawer.Root placement="end">
                <Drawer.Backdrop />
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
                        <Separator />
                        <Button
                          variant="outline"
                          onClick={() => router.push('/auth/login')}
                        >
                          Log in
                        </Button>
                        <Button
                          bg="black"
                          color="white"
                          _hover={{ bg: 'gray.900' }}
                        >
                          Create a Free Draft
                        </Button>
                      </VStack>
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Root>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
