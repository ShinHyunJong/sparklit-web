import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import { Swiper, SwiperSlide } from 'swiper/react';

import uploadAtom from '@/atoms/upload';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import type { InvitationPhoto } from '@/types/model';

function MainPhoto({
  photoList,
  setIsThumb,
}: {
  photoList: InvitationPhoto[];
  setIsThumb: (isThumb: boolean) => void;
}) {
  const setSelectedImage = useSetAtom(uploadAtom.selectedImage);
  const setPhotoEditorOpen = useSetAtom(uploadAtom.photoEditorOpen);

  const handleImageSelect = (image: InvitationPhoto) => {
    setPhotoEditorOpen(true);
    setSelectedImage(image);
    setIsThumb(false);
  };

  return (
    <>
      {photoList.length > 0 && (
        <Swiper
          style={{ width: '100%' }}
          autoHeight={true}
          slidesPerView={1}
          loop
          spaceBetween={0}
        >
          {photoList.map((image) => {
            return (
              <SwiperSlide className="swiper-slide" key={`slide-${image.id}`}>
                <Flex
                  cursor="pointer"
                  position="relative"
                  w="full"
                  justifyContent="center"
                  onClick={() => handleImageSelect(image)}
                >
                  <Image
                    w="40%"
                    objectFit="cover"
                    alt="firstUploadingImage"
                    src={`${S3_BUCKET_URL}${image.croppedKey}`}
                  ></Image>
                  <Box
                    bg="rgba(0,0,0,0.4)"
                    position="absolute"
                    w="full"
                    left={0}
                    bottom="4px"
                    zIndex={10}
                    py={4}
                    textAlign="center"
                  >
                    <Text color="white" fontSize="sm">
                      Edit Main
                    </Text>
                  </Box>
                </Flex>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

export default MainPhoto;
