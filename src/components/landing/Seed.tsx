'use client';

import { Container, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal, { Fade } from 'react-awesome-reveal';

import { slideUpFrame } from '@/constants/animation';
import { layoutConstants } from '@/constants/layout';

const imageWidth = 275;
const imageHeight = imageWidth * 0.94;

function Seed() {
  const t = useTranslations('greeting');
  return (
    <Flex
      direction="column"
      w="full"
      bg="white"
      alignItems="center"
      justifyContent="end"
      textAlign="center"
      px={layoutConstants.landingPaddingX}
      pt={32}
    >
      <Container>
        <Reveal
          keyframes={slideUpFrame}
          delay={200}
          duration={1400}
          cascade
          triggerOnce
        >
          <Text
            as="h2"
            wordBreak="keep-all"
            data-state="open"
            _open={{
              animation: 'fade-in 1300ms ease-out',
            }}
            lineHeight="normal"
            fontSize={layoutConstants.landingTitleSize}
          >
            농업의 Value-chain 에서 첫 시작이자 근간인
            <br />
          </Text>
          <Text
            as="h2"
            lineHeight="normal"
            fontSize={layoutConstants.landingTitleSize}
            wordBreak="keep-all"
          >
            UPSTREAM{' '}
            <Text
              bgGradient="linear-gradient(to right, {colors.teal.600} 30%, {colors.teal.800})"
              bgClip="text"
              // gradientFrom="teal.600"
              // gradientTo="teal.800"
              as="strong"
            >
              품종
            </Text>
            에 집중합니다.
          </Text>
        </Reveal>
      </Container>

      <Fade triggerOnce>
        <Image
          src="/assets/images/seedBean.png"
          alt="seed"
          width={imageWidth}
          height={imageHeight}
        />
      </Fade>
    </Flex>
  );
}

export default Seed;
