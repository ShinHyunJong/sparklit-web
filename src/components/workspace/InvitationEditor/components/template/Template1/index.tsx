import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { useInvitationDetail } from '@/hooks/invitation';

import PhotoPlaceholder from '../components/PhotoPlaceholder';

function Template1() {
  const [selectedDate] = useAtom(invitationEditorAtom.selectedDate);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);
  const date = new Date(selectedDate);
  const { invitationDetail } = useInvitationDetail();

  const mainPhoto = invitationDetail?.invitationCoverPhotoList
    ? invitationDetail.invitationCoverPhotoList[0]
    : null;

  const firstPlace = invitationDetail?.placeList
    ? invitationDetail.placeList[0]
    : null;

  const firstTime = firstPlace?.timeList ? firstPlace.timeList[0] : null;
  return (
    <Flex w="full" h="full" direction="column" pt={16} pb={32}>
      <Center>
        <Flex direction="column" alignItems="center" gap={3}>
          <Heading fontWeight="normal" size="2xl">
            {dayjs(date).format('YYYY / MM / DD')}
          </Heading>
          <Text> {dayjs(date).format('dddd')}</Text>
        </Flex>
      </Center>
      <Box p={6}>
        {mainPhoto ? (
          <Box
            w="full"
            position="relative"
            aspectRatio={`${mainPhoto.width} / ${mainPhoto.height}`}
            mb={4}
          >
            <Image
              fill
              priority
              style={{ objectFit: 'cover' }}
              src={`${S3_BUCKET_URL}${mainPhoto.croppedKey}`}
              alt="Main Photo"
            />
          </Box>
        ) : (
          <PhotoPlaceholder />
        )}
      </Box>
      <Stack spaceY={20}>
        <Stack>
          <Center>
            <Flex gap={4}>
              <Heading fontSize="md">{groomFirstName}</Heading>
              <Heading fontSize="md">·</Heading>
              <Heading fontSize="md">{brideFirstName}</Heading>
            </Flex>
          </Center>
          <Center>
            <Flex gap={2}>
              <Text fontSize="md">
                {dayjs(date).format('YYYY, MM, DD, dddd,')}
              </Text>
              <Text fontSize="md">
                {firstTime && dayjs(firstTime.time).format('HH:mm')}
              </Text>
            </Flex>
          </Center>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default Template1;
