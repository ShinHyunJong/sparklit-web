import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';

function Vision() {
  const t = useTranslations('vision');
  return (
    <Center h="65vh" className="visionBg" px={[4, 8, 12]}>
      <Flex
        justifyContent="center"
        backdropFilter="blur(12px)"
        bg="rgba(0, 0, 0, 0.3)"
        rounded="md"
        p={[4, 8, 12]}
        direction="column"
      >
        <Text
          color="gray.400"
          textAlign="center"
          fontSize={layoutConstants.sectionTitleSize}
          mb={4}
        >
          {t('visionLabel')}
        </Text>
        <Heading
          fontSize={layoutConstants.sectionTitleSize}
          as="h1"
          color="white"
          fontWeight={400}
          textAlign="center"
          wordBreak="keep-all"
        >
          {t('title1')}
          <br /> {t('title2')}
        </Heading>
      </Flex>

      {/* <Image
          style={{ objectFit: 'contain' }}
          width={666}
          height={375}
          alt="future"
          src="/assets/images/roversFuture.png"
        /> */}
    </Center>
  );
}

export default Vision;
