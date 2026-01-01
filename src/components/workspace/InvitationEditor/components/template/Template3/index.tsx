import type { Color } from '@chakra-ui/react';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import type { InvitationCoverPhoto, InvitationPlaceTime } from '@/types/model';

import PhotoPlaceholder from '../components/PhotoPlaceholder';

dayjs.extend(advancedFormat);

function Template3({
  date,
  mainPhoto,
  firstTime,
  mainTextColor,
  pointColor,
}: {
  date: string;
  mainPhoto: InvitationCoverPhoto | null;
  firstTime: InvitationPlaceTime | null;
  mainTextColor: Color | null;
  pointColor: string | null;
}) {
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);
  return (
    <Flex w="full" h="full" direction="column" pt={16} pb={32}>
      <Center mb={8}>
        <Flex direction="column" alignItems="center" gap={4}>
          <Flex alignItems="center" gap={3}>
            <Heading>{groomFirstName}</Heading>
            <Heading color={pointColor} fontSize="md">
              <FaHeart></FaHeart>
            </Heading>
            <Heading>{brideFirstName}</Heading>
          </Flex>
          <Flex>
            <Text color="gray.800">
              {dayjs(date).format('YYYY, MM Do, A hh:mm')}
            </Text>
          </Flex>
        </Flex>
      </Center>
      {mainPhoto ? (
        <Box
          position="relative"
          aspectRatio={mainPhoto.width / mainPhoto.height}
        >
          <Image
            src={`${S3_BUCKET_URL}${mainPhoto.croppedKey}`}
            alt="Parallax image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            style={{ objectFit: 'cover' }}
          />

          <Flex w="full" h="full" alignItems="end" justifyContent="center">
            <Flex
              w="full"
              direction="column"
              alignItems="center"
              justifyContent="center"
              px={4}
              color={mainTextColor?.toString('hex')}
            >
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
      ) : (
        <PhotoPlaceholder />
      )}
    </Flex>
  );
}

export default Template3;
