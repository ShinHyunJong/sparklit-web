import { AspectRatio, Box } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { useInvitationDetail } from '@/hooks/invitation';

import TextEditorViewer from '../../inputs/TextEditor/viewer';
import PhotoPlaceholder from './PhotoPlaceholder';

function Ending() {
  const { invitationDetail } = useInvitationDetail();
  const endPhoto = invitationDetail?.invitationCoverPhotoList.find(
    (photo) => photo.type === 'end',
  );
  const endingText = useAtomValue(invitationEditorAtom.endingText);

  return (
    <Fade triggerOnce>
      {endPhoto ? (
        <AspectRatio
          ratio={endPhoto.width / endPhoto.height}
          position="relative"
        >
          <Box position="absolute" top={0} w="full" h="full">
            <Image
              unoptimized
              src={`${S3_BUCKET_URL}${endPhoto.croppedKey}`}
              alt="Parallax image"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: 'cover' }}
            />

            <Box position="absolute" inset={0} bg="blackAlpha.600" />
            <Box position="absolute" inset={0} p={4} color="white">
              <TextEditorViewer
                isImageCover
                verticalCenter
                content={endingText}
              />
            </Box>
          </Box>
        </AspectRatio>
      ) : (
        <PhotoPlaceholder
          overlayComponent={
            <TextEditorViewer verticalCenter content={endingText} />
          }
        />
      )}
    </Fade>
  );
}

export default Ending;
