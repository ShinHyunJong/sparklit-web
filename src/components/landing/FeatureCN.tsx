import { Box, Container, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { FaSearch } from 'react-icons/fa';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { GrUserSettings } from 'react-icons/gr';
import { LuHandshake } from 'react-icons/lu';

import { layoutConstants } from '@/constants/layout';

const featureList = [
  {
    id: 1,
    titleKey: 'search.title',
    icon: FaSearch,
    descriptionKey: 'search.description',
  },
  {
    id: 2,
    titleKey: 'inout.title',
    icon: FaArrowRightArrowLeft,
    descriptionKey: 'inout.description',
  },
  {
    id: 3,
    titleKey: 'royalty.title',
    icon: LuHandshake,
    descriptionKey: 'royalty.description',
  },
  {
    id: 4,
    titleKey: 'management.title',
    icon: GrUserSettings,
    descriptionKey: 'management.description',
  },
];

function FeatureCN() {
  const t = useTranslations('featureCN');
  return (
    <Flex bg="black" pt={24} pb={[8, 12]}>
      <Container maxW="7xl">
        <Flex color="white" my={8} direction="column" lineHeight="normal">
          <Text
            fontSize={layoutConstants.sectionTitleSize}
            as="h2"
            fontWeight="bold"
          >
            {t('title1')}
          </Text>
          <Text
            fontSize={layoutConstants.sectionTitleSize}
            as="h2"
            fontWeight="bold"
          >
            {t('title2')}
          </Text>
        </Flex>
        <SimpleGrid columns={[1, 2, 2, 4]} w="full" mt={8}>
          {featureList.map((f, i) => {
            return (
              <Flex
                p={4}
                gap={4}
                borderRadius="lg"
                flexDirection="column"
                alignItems="center"
                key={`feature-${f.id}`}
              >
                <Flex
                  // boxShadow="0 0 10px 2px rgba(255, 255, 255, 0.5)"
                  bg="gray.800"
                  w="full"
                  p={[4, 8]}
                  h="full"
                  borderRadius="lg"
                  position="relative"
                  direction="column"
                >
                  <Icon color="gray.700" size={['md', 'lg', '2xl']} mb={4}>
                    <f.icon />
                  </Icon>
                  <Box position="relative">
                    <Text
                      color="gray.600"
                      fontWeight="bold"
                      maskImage="linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)"
                      fontSize={['5xl', '7xl', '9xl']}
                      mb={16}
                    >
                      0{i + 1}
                    </Text>

                    <Flex position="relative" w="full" h={1} bg="gray.700">
                      <Box
                        position="absolute"
                        bg="white"
                        h={1}
                        w="25%"
                        left={`${i * 25}%`}
                      ></Box>
                    </Flex>
                    <Box position="absolute" top={[10, 16, 28]}>
                      <Text
                        lineHeight="normal"
                        fontWeight="bold"
                        wordBreak="keep-all"
                        color="gray.200"
                        fontSize={['lg', 'xl', '3xl']}
                      >
                        {t(f.titleKey)}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Flex>
            );
          })}
        </SimpleGrid>
        {/* <Flex mt={[8, 12, 16]} w="full" h="40vh" justifyContent="center">
          <Box w="full" h="full" position="relative">
            <Image
              style={{ objectPosition: 'top', objectFit: 'contain' }}
              fill
              alt="cn"
              src="/assets/images/cropnavigator.png"
            />
          </Box>
        </Flex> */}
      </Container>
    </Flex>
  );
}

export default FeatureCN;
