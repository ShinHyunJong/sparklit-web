import { Flex, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';

function Certificate() {
  const t = useTranslations('greeting');
  return (
    <Flex
      direction="column"
      w="full"
      bg="white"
      alignItems="center"
      justifyContent="end"
      textAlign="center"
      bgGradient="linear-gradient(to right, {colors.teal.700} 30%, {colors.gray.900})"
      px={layoutConstants.landingPaddingX}
      py={24}
    >
      <Flex rounded="lg" borderWidth={1} borderColor="gray.200" p={4}>
        <Text color="white">Asia & Pacific Seed Association</Text>
      </Flex>
    </Flex>
  );
}

export default Certificate;
