'use client';

import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react';

import { layoutConstants } from '@/constants/layout';
import { useAuth } from '@/hooks/auth';

function Header() {
  const { user } = useAuth();
  return (
    <Box
      as="header"
      w="100vw"
      minH={`${layoutConstants.headerHeight}px`}
      display="flex"
      backdropFilter="blur(7px)"
      bg="whiteAlpha.700"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      zIndex={10}
    >
      <Container maxW="7xl">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={4}>
            <Heading>Sparklit</Heading>
            {/* <Box w={[120, 200]} h={[40, 66]} position="relative">
              <Text>Sparklit</Text>
              <Image
                width={200}
                height={66}
                alt="logo"
                src="/assets/images/logo_white.png"
              ></Image>
            </Box> */}

            {/* <Heading size="3xl" color="white">
              ROVERS
            </Heading> */}
          </Flex>
          <Flex gap={4}>
            {/* <LocaleSwitcher /> */}
            {user && (
              <AvatarGroup>
                <Avatar.Root>
                  <Avatar.Fallback />
                  <Avatar.Image />
                </Avatar.Root>
              </AvatarGroup>
            )}
            {/* <InquiryDialog
              colorPalette="gray"
              variant="surface"
              buttonText={t('inquiryText')}
            /> */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
