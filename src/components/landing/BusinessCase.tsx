'use client';

import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { layoutConstants } from '@/constants/layout';

import BusinessCaseItem from './BusinessCaseItem';

export type BusinessCaseType = {
  id: string;
  name: string;
  variety: string;
  description: string;
  type: string;
  area: string;
  imageUrl: string;
  targetUrl: string;
  sourceUrl: string;
};

const caseList = [
  {
    id: 'usa1',
    name: '미국',
    variety: 'usa1.variety',
    description: 'usa1.description',
    type: 'Core IP',
    area: 'usa1.area',
    imageUrl: '/assets/images/rice.jpg',
    targetUrl: '/assets/images/usFlag.png',
    sourceUrl: '/assets/images/krFlag.png',
  },
  {
    id: 'usa2',
    name: '미국',
    variety: 'usa2.variety',
    description: 'usa2.description',
    type: 'Variable IP',
    area: 'usa2.area',
    imageUrl: '/assets/images/krMelon.jpg',
    targetUrl: '/assets/images/usFlag.png',
    sourceUrl: '/assets/images/krFlag.png',
  },
  {
    id: 'mexico',
    name: '멕시코',
    variety: 'mexico.variety',
    description: 'mexico.description',
    type: 'Variable IP',
    area: 'mexico.area',
    imageUrl: '/assets/images/pepper.jpg',
    targetUrl: '/assets/images/mxFlag.png',
    sourceUrl: '/assets/images/krFlag.png',
  },
  {
    id: 'netherland',
    name: '네덜란드',
    type: 'Variable IP',
    variety: 'netherland.variety',
    description: 'netherland.description',
    area: 'netherland.area',
    imageUrl: '/assets/images/flower.jpg',
    targetUrl: '/assets/images/ntFlag.png',
    sourceUrl: '/assets/images/krFlag.png',
  },
  {
    id: 'korea',
    name: '한국',
    type: 'Variable IP',
    variety: 'korea.variety',
    description: 'korea.description',
    area: 'korea.area',
    imageUrl: '/assets/images/greenHyang.jpg',
    targetUrl: '/assets/images/krFlag.png',
    sourceUrl: '/assets/images/krFlag.png',
  },
];

function BusinessCase() {
  const isMinWidthSm = useBreakpointValue({ sm: true });
  const t = useTranslations('businessCase');
  return (
    <Box w="full" bg="gray.900" pt={16} pb={32}>
      <Container maxW="7xl">
        <Flex my={8}>
          <Text
            fontSize={layoutConstants.sectionTitleSize}
            as="h2"
            fontWeight="bold"
            color="white"
          >
            {t('title')}
          </Text>
        </Flex>
        <Swiper
          slidesPerView="auto" // Allows dynamic slide width
          spaceBetween={16} // Adjust gap between slides
          initialSlide={0}
          centeredSlides
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          loop // Enables looping
          speed={500}
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Keep autoplay even when user interacts
          }}
        >
          {caseList.map((item, index) => (
            <SwiperSlide
              style={{
                width: !isMinWidthSm ? '100%' : '30%',
                // marginLeft: index === 0 ? '8%' : '0',
              }}
              key={item.id}
            >
              <BusinessCaseItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default BusinessCase;
