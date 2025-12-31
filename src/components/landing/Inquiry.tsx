import { Container, Flex, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';

import InquiryDialog from './InquiryDialog';

function Inquiry() {
  const t = useTranslations('inquiry');
  return (
    <Flex h="80vh" bg="gray.800">
      <Container maxW="7xl">
        <Flex
          w="full"
          h="full"
          direction={{ base: 'column', md: 'row' }}
          py={[8, 12, 16]}
        >
          <Flex flex={1} justifyContent="center" direction="column" gap={4}>
            <Text
              fontSize={layoutConstants.sectionTitleSize}
              as="h1"
              color="white"
              wordBreak="keep-all"
            >
              {t('title1')} <br />
              {t('title2')}
            </Text>
            <Flex mt={4}>
              <InquiryDialog
                size="lg"
                variant="subtle"
                colorPalette="black"
                buttonText={t('buttonText')}
              />
            </Flex>
          </Flex>
          <Flex
            flex={1}
            justifyContent="center"
            alignItems="center"
            p={[4, 8, 12]}
          >
            <video
              style={{
                borderRadius: 10,
                objectFit: 'contain',
              }}
              width="100%"
              height="auto"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/roversInquiry.mp4" />
            </video>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Inquiry;
