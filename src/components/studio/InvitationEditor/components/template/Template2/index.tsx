import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import Image from 'next/image';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import type { InvitationCoverPhoto, InvitationPlaceTime } from '@/types/model';

import PhotoPlaceholder from '../components/PhotoPlaceholder';

function Template2({
  date,
  mainPhoto,
  firstTime,
}: {
  date: string;
  mainPhoto: InvitationCoverPhoto | null;
  firstTime: InvitationPlaceTime | null;
}) {
  const brideFirstName = useAtomValue(invitationEditorAtom.brideFirstName);
  const groomFirstName = useAtomValue(invitationEditorAtom.groomFirstName);

  return (
    <Flex w="full" h="full" direction="column" pt={16} pb={32}>
      <Center>
        <Flex direction="column" alignItems="center" gap={4}>
          <Text fontFamily="crimsonPro">THE NEW BEGINNING</Text>
          <Heading>
            {groomFirstName} & {brideFirstName}
          </Heading>
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
              sizes="(max-width: 768px) 100vw, 420px"
              src={`${S3_BUCKET_URL}${mainPhoto.croppedKey}`}
              alt="Main Photo"
            />
          </Box>
        ) : (
          <PhotoPlaceholder />
        )}
      </Box>
      <Center>
        <Text fontSize="4xl" fontFamily="tangerine">
          We are getting married!
        </Text>
      </Center>
      <Center mt={4}>
        <Text fontSize="md">
          {dayjs(date).format('MMMM D, YYYY')}
          {firstTime ? ` ${dayjs(firstTime.time).format('h:mm A')}` : ''}
        </Text>
      </Center>
    </Flex>
  );
}

export default Template2;
