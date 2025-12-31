import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';

import InquiryDialog from './InquiryDialog';

function Greeting() {
  const t = useTranslations('greeting');
  return (
    <Box h={{ base: '100vh', md: '90vh' }} className="greetingBg">
      <Container maxW="7xl" h="full" pt={[0]}>
        <Flex
          w="full"
          h="full"
          gap={{ base: 8, md: 4 }}
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
        >
          <Flex direction="column" w="full" h="full" justifyContent="center">
            <Flex
              direction="column"
              wordBreak="keep-all"
              width={{ base: '80%', md: '40%' }}
            >
              <Text
                as="h1"
                color="white"
                fontWeight="bold"
                lineHeight="initial"
                wordBreak="keep-all"
                fontSize={layoutConstants.landingTitleSize}
              >
                {t('title1')}
                <br />
                {t('title2')}
              </Text>
              <Text
                fontSize={layoutConstants.landingDescSize}
                mt={2}
                color="gray.200"
              >
                {t('description')}
              </Text>
              <Flex mt={8} gap={2}>
                <InquiryDialog
                  size="lg"
                  colorPalette="brand"
                  buttonText={t('inquiryText')}
                />
              </Flex>
            </Flex>
          </Flex>
          {/* <Flex h="full" flex={1} alignItems={{ base: 'start', md: 'center' }}>
            <video
              style={{
                borderRadius: 10,
                objectFit: 'contain',
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/greeting.mp4" />
            </video>
          </Flex> */}
        </Flex>
      </Container>
    </Box>
  );
}

export default Greeting;
