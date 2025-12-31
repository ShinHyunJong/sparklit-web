import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';
import { figtree } from '@/styles';

const ipType = [
  {
    text: 'Core IP',
    descriptionKey: 'coreIpDesc',
    imageUrl: '/assets/images/coreIpImage.jpg',
  },
  {
    text: 'Seasonal IP',
    descriptionKey: 'seasonalIpDesc',
    imageUrl: '/assets/images/seasonalIpImage.jpg',
  },
  {
    text: 'Variable IP',
    descriptionKey: 'variableIpDesc',
    imageUrl: '/assets/images/variableIpImage.jpg',
  },
  {
    text: 'Future IP',
    descriptionKey: 'futureIpDesc',
    imageUrl: '/assets/images/aiIpImage.jpg',
  },
];

function Portfolio() {
  const t = useTranslations('portfolio');
  return (
    <Box className="portfolioBg">
      <Container maxW="7xl">
        <Flex py={16}>
          <Text
            fontSize={layoutConstants.sectionTitleSize}
            as="h2"
            color="white"
            fontWeight="bold"
          >
            {t('title')}
          </Text>
        </Flex>

        {ipType.map((type) => {
          return (
            <SimpleGrid
              borderTopWidth={1}
              borderColor="gray.800"
              gapX={[4, 8, 16]}
              gapY={[4, 8, 4]}
              key={`${type.text}`}
              columns={{ base: 1, lg: 2 }}
              w="full"
              py={[4, 8, 16]}
            >
              <Flex alignItems="center">
                <Heading
                  className={figtree.className}
                  lineHeight={0.9}
                  color="white"
                  fontSize={['2xl', '4xl', '6xl']}
                >
                  {type.text}
                </Heading>
              </Flex>
              <Flex
                alignItems="center"
                direction={{ base: 'column', lg: 'row' }}
                gap={4}
                bg="rgba(63, 63, 70, 0.4)"
                py={4}
                px={8}
                borderRadius="md"
              >
                <Flex flexBasis={{ base: 'auto' }}>
                  <Text
                    color="gray.200"
                    wordBreak="keep-all"
                    fontSize={layoutConstants.sectionDescSize}
                  >
                    {t(type.descriptionKey)}
                  </Text>
                </Flex>
                <Flex
                  position="relative"
                  w="full"
                  h={{ base: '135px', md: '200px' }}
                  aspectRatio={4 / 3}
                >
                  <Image
                    alt="ip-portfolio"
                    style={{ borderRadius: '0.2rem', objectFit: 'cover' }}
                    fill
                    src={type.imageUrl || ''}
                  />
                </Flex>
              </Flex>
            </SimpleGrid>
          );
        })}
      </Container>
    </Box>
  );
}

export default Portfolio;
