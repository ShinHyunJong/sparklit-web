'use client';

import { Icon, Menu } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaGlobe } from 'react-icons/fa6';

function LocaleSwitcher() {
  const router = useRouter();

  return (
    <Menu.Root>
      <Menu.Trigger cursor="pointer">
        <Icon
          _hover={{ color: 'gray.600', transition: 'color 0.2s ease-in' }}
          color="gray.500"
          size="md"
          borderRadius="full"
        >
          <FaGlobe />
        </Icon>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            onClick={() => router.replace('/en')}
            cursor="pointer"
            value="en"
          >
            English
          </Menu.Item>
          <Menu.Item
            cursor="pointer"
            onClick={() => router.replace('/ko')}
            value="ko"
          >
            한국어
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}

export default LocaleSwitcher;
