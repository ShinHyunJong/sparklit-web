import { Box, Flex, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { layoutConstants } from '@/constants/layout';

const divideIntoChunks = (arr: any, chunkSize: any) => {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};
const imageSize = 150;

export default function ImageLoop({ images }: { images: string[] }) {
  const list = divideIntoChunks(images, 30);
  const t = useTranslations('imageLoop');
  return (
    <Box bg="black" overflow="hidden">
      <Flex
        position="relative"
        h={['50vh', '75vh']}
        gap={[2, 4]}
        justifyContent="center"
      >
        <Box
          zIndex={4}
          px={4}
          position="absolute"
          textAlign="center"
          inset={0}
          h="full"
          bg="blackAlpha.800"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            h="100%"
            color="white"
          >
            <Heading fontSize={layoutConstants.sectionTitleSize}>
              {t('message')}
            </Heading>
          </Flex>
        </Box>
        {list.map((_, i) => (
          <Flex
            key={i}
            direction="column"
            gap={[2, 4]}
            overflow="hidden"
            h={imageSize * _.length * 3}
            animation={
              (i + 1) % 2 !== 0
                ? 'loopTopToBottom 36s linear infinite'
                : 'loopBottomToTop 36s linear infinite'
            }
          >
            {[..._, ..._, ..._].map((src, index) => (
              <Image
                unoptimized
                style={{
                  borderRadius: '5%',
                  objectFit: 'cover',
                }}
                alt={`${src}-${index}`}
                key={`${src}-${index}`}
                src={`https://www.seed.go.kr${src}`}
                width={imageSize}
                height={imageSize}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
