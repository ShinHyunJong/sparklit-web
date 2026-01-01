import type { Color } from '@chakra-ui/react';
import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useAtomValue } from 'jotai';
import Image from 'next/image';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import type { InvitationCoverPhoto, InvitationPlaceTime } from '@/types/model';

import PhotoPlaceholder from '../components/PhotoPlaceholder';
import GettingMarried from './GettingMarried';

// 2. Day.js에 플러그인을 장착시킵니다.
dayjs.extend(advancedFormat);

function Template4({
  date,
  mainPhoto,
  firstTime,
  mainTextColor,
}: {
  date: string;
  mainPhoto: InvitationCoverPhoto | null;
  firstTime: InvitationPlaceTime | null;
  mainTextColor: Color | null;
}) {
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);

  return (
    <Flex w="full" h="full" direction="column" pb={32}>
      {/* <Center>
        <Flex direction="column" alignItems="center" gap={4}>
          <Text fontFamily="crimsonPro">THE NEW BEGINNING</Text>
          <Heading>
            {groomFirstName} & {brideFirstName}
          </Heading>
        </Flex>
      </Center> */}
      {mainPhoto ? (
        <Box>
          <AspectRatio
            ratio={mainPhoto.width / mainPhoto.height}
            position="relative"
          >
            <Box position="relative">
              <Box position="absolute" top={0} w="full" h="full">
                <Image
                  src={`${S3_BUCKET_URL}${mainPhoto.croppedKey}`}
                  alt="Parallax image"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  style={{ objectFit: 'cover' }}
                />

                <Box position="absolute" inset={0} bg="blackAlpha.300" />
                <Box position="absolute" inset={0}>
                  <Flex
                    w="full"
                    h="full"
                    alignItems="end"
                    justifyContent="center"
                  >
                    <Flex
                      w="full"
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      px={4}
                      color={mainTextColor?.toString('hex')}
                    >
                      <GettingMarried></GettingMarried>
                      <Flex
                        px={4}
                        py={8}
                        w="full"
                        fontWeight="bold"
                        fontFamily="crimsonPro"
                        fontSize="2xl"
                        justifyContent="space-between"
                      >
                        <Text>{dayjs(date).format('Do')}</Text>
                        <Text>{dayjs(date).format('MMM')}</Text>
                        <Text>{dayjs(date).format('YYYY')}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </AspectRatio>
        </Box>
      ) : (
        <PhotoPlaceholder />
      )}
    </Flex>
  );
}

export default Template4;
