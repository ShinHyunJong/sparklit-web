import {
  Box,
  Center,
  Flex,
  GridItem,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LuImage } from 'react-icons/lu';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { useInvitationDetail } from '@/hooks/invitation';

import SubHeader from './SubHeader';

function Gallery() {
  const { invitationDetail } = useInvitationDetail();
  const photoList = invitationDetail?.photoList || [];
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);

  const [selectedPhoto, setSelectedPhoto] = useState(photoList[0]);
  const [renderingPhotoList, setRenderingPhotoList] = useAtom(
    invitationEditorAtom.renderingPhotoList,
  );
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const swiperRef = useRef<SwiperType>(null);
  useEffect(() => {
    setRenderingPhotoList(photoList);
  }, [photoList]);

  const onClickThumb = (index: number) => {
    if (swiperInstance) {
      // console.log('swiperRef.current', swiperRef.current);
      // swiperRef.current.slideTo(index);
      swiperInstance?.slideToLoop(index);
    }
  };

  return (
    <Flex direction="column">
      <Center flexDirection="column">
        <SubHeader title="GALLERY"></SubHeader>
        <Icon fontSize={24} color={pointColor} mb={6}>
          <LuImage />
        </Icon>
      </Center>

      {/* <Box
        position="relative"
        aspectRatio={selectedPhoto.width / selectedPhoto.height}
      >
        <Image
          src={selectedPhoto.url}
          alt="Selected Photo"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box> */}
      {renderingPhotoList.length > 0 && (
        <Swiper
          style={{ width: '100%' }}
          autoHeight={true}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          slidesPerView={1}
          loop
          spaceBetween={0}
        >
          {renderingPhotoList.map((image) => {
            return (
              <SwiperSlide className="swiper-slide" key={`slide-${image.id}`}>
                <Box
                  cursor="pointer"
                  position="relative"
                  aspectRatio={image.width / image.height}
                  // onClick={() => handleImageSelect(image)}
                >
                  <Image
                    fill
                    unoptimized
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 420px"
                    alt={image.id.toString()}
                    src={`${S3_BUCKET_URL}${image.croppedKey}`}
                  ></Image>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <SimpleGrid gap={2} mt={4} columns={5}>
        {renderingPhotoList.map((image, index) => (
          <GridItem
            cursor="pointer"
            onClick={() => onClickThumb(index)}
            key={`thumb-${image.id}`}
            position="relative"
            aspectRatio={1}
          >
            <Image
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 420px"
              src={`${S3_BUCKET_URL}${image.thumbKey}`}
              alt={`${image.id}`}
              style={{ objectFit: 'cover' }}
            ></Image>
          </GridItem>
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export default Gallery;
