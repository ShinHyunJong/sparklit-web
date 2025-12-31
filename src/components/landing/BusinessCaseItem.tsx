import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaLocationDot } from 'react-icons/fa6';

import { layoutConstants } from '@/constants/layout';

import type { BusinessCaseType } from './BusinessCase';

type BusinessCaseItemProps = {
  item: BusinessCaseType;
};

function BusinessCaseItem({ item }: BusinessCaseItemProps) {
  const t = useTranslations('businessCase');
  return (
    <Flex borderRadius="sm" direction="column">
      <Flex h="200px">
        <Flex position="relative" h="full" w="full" direction="column">
          <Flex
            borderTopEndRadius={4}
            inset={0}
            position="absolute"
            bg="blackAlpha.700"
            w="full"
            h="full"
            zIndex={2}
            p={4}
          >
            <Flex alignSelf="flex-end" direction="column">
              <Heading
                color="white"
                wordBreak="keep-all"
                fontSize={layoutConstants.sectionSubTitleSize}
              >
                {t(item.variety)}
              </Heading>
              <Flex>
                <Text color="gray.300">{item.type}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Image
            fill
            style={{
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              objectFit: 'cover',
            }}
            alt="krMelon"
            src={item.imageUrl || ''}
          />
        </Flex>
      </Flex>
      <Flex
        bg="gray.800"
        p={4}
        direction="column"
        flexBasis={{ base: '290px', md: '270px' }}
        gap={2}
      >
        <Flex alignItems="center">
          <Flex flexBasis="100px">
            <Text color="gray.300">{t('target')}</Text>
          </Flex>
          <Flex flex={1} justifyContent="flex-end">
            <Image
              height={20}
              width={20 * 1.89}
              style={{ objectFit: 'contain' }}
              alt="usa"
              src={item.targetUrl}
            />
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flex={1}>
            <Text color="gray.300">{t('source')}</Text>
          </Flex>
          <Flex flex={1} justifyContent="flex-end">
            <Image
              height={20}
              width={20 * 1.89}
              style={{ objectFit: 'contain' }}
              alt="kr"
              src={item.sourceUrl}
            />
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flex={1}>
            <Text color="gray.300">{t('cropArea')}</Text>
          </Flex>
          <Flex flex={1} justifyContent="flex-end">
            <Flex
              textAlign="right"
              justifyContent="flex-end"
              alignItems="center"
              gap={1}
            >
              <Icon color="white">
                <FaLocationDot />
              </Icon>
              <Text textAlign="right" color="gray.100" fontWeight="bold">
                {t(item.area)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Flex flex={1}>
            <Text color="gray.300">{t('description')}</Text>
          </Flex>
          <Flex flex={1} justifyContent="flex-end">
            <Text
              textAlign="right"
              wordBreak="keep-all"
              color="gray.100"
              fontWeight="bold"
            >
              {t(item.description)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default BusinessCaseItem;
