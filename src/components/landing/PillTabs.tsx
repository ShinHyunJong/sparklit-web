import { Button, HStack } from '@chakra-ui/react';

import { THEME } from '@/app/page';

const PillTabs = ({
  value,
  onChange,
  tabs,
}: {
  value: string;
  onChange: (v: string) => void;
  tabs: { label: string; value: string }[];
}) => {
  return (
    <HStack
      bg="#EFE8E2"
      borderRadius="full"
      p={1}
      gap={1}
      w={{ base: 'full', md: 'auto' }}
      justify={{ base: 'space-between', md: 'flex-start' }}
      overflow="hidden"
    >
      {' '}
      {tabs.map((t) => {
        const active = value === t.value;
        return (
          <Button
            key={t.value}
            onClick={() => onChange(t.value)}
            size="sm"
            borderRadius="full"
            flex={{ base: 1, md: 'initial' }}
            bg={active ? '#2F2F2F' : 'transparent'}
            color={active ? 'white' : THEME.muted}
            _hover={{ bg: active ? '#2F2F2F' : 'whiteAlpha.600' }}
            fontWeight="semibold"
          >
            {' '}
            {t.label}{' '}
          </Button>
        );
      })}{' '}
    </HStack>
  );
};

export default PillTabs;
