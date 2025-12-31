'use client';

import { Center } from '@chakra-ui/react';
import Lottie from 'lottie-react';

import data from './statGlobal.json';

function LottieRenderer() {
  return (
    <Center w="240px">
      <Lottie animationData={data} loop />
    </Center>
  );
}

export default LottieRenderer;
