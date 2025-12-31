'use client';

import { Box, Container, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { FaGlobe } from 'react-icons/fa6';

import { layoutConstants } from '@/constants/layout';

const statList = [
  { text: 'db.title', value: 'db.value' },
  { text: 'businessIP.title', value: 'businessIP.value' },
  { text: 'businessCountryCount.title', value: 'businessCountryCount.value' },
  { text: 'businessSpeed.title', value: 'businessSpeed.value' },
];

function Stats() {
  const t = useTranslations('stats');
  return (
    <Box bg="gray.900">
      <Container maxW="7xl">
        <Flex
          direction="column"
          w="full"
          borderRadius="sm"
          py={32}
          alignItems="center"
        >
          <Flex
            textAlign="center"
            alignItems="center"
            direction="column"
            mb={16}
            gap={2}
          >
            <Text
              lineHeight="normal"
              fontWeight="bold"
              fontSize={layoutConstants.landingTitleSize}
              color="white"
            >
              {t('title1')} <br />
              {t('title2')}
            </Text>
            <Text color="gray.400" mb={8}>
              {t('description')}
            </Text>
            {/* <LottieRenderer /> */}
            <Icon width="50px" height="50px" color="white">
              <FaGlobe />
            </Icon>
          </Flex>
          <SimpleGrid w="full" columns={[1, 2, 4]} gapY={8} px={4}>
            {statList.map((stat, i) => {
              return (
                <Flex
                  direction="column"
                  key={`${stat.text}`}
                  alignItems="center"
                  borderColor="gray.600"
                  borderRightWidth={{
                    base: 0,
                    md: i < statList.length - 1 ? 1 : 0,
                  }}
                >
                  <Text
                    fontWeight="bold"
                    fontSize={layoutConstants.sectionTitleSize}
                    color="white"
                    textAlign="center"
                  >
                    {t(stat.value)}
                  </Text>
                  <Text textAlign="center" color="gray.400">
                    {t(stat.text)}
                  </Text>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  );
}

export default Stats;
