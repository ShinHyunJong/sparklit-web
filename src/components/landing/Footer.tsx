import { Container, Flex, Image, Separator, Text } from '@chakra-ui/react';

const partnerLogos = [
  {
    src: '/assets/images/koreaInvesAcc.png',
    alt: 'koreaInvesAcc',
  },
  {
    src: '/assets/images/antler.png',
    alt: 'antler',
  },
  {
    src: '/assets/images/byucksan.png',
    alt: 'byucksan',
  },
  {
    src: '/assets/images/haatz.png',
    alt: 'hattz',
  },
  {
    src: '/assets/images/gccei.png',
    alt: 'gccei',
  },
  {
    src: '/assets/images/infobank.png',
    alt: 'infobank',
  },
];

function Footer() {
  return (
    <Flex py={16} bg="gray.200">
      <Container>
        <Text color="black" fontWeight="bold">
          Backed By
        </Text>
        <Flex flexWrap="wrap" mt={4} gap={2}>
          {partnerLogos.map((x) => {
            return (
              <Image
                key={x.alt}
                alt={x.alt}
                src={x.src}
                w="120px"
                h="auto"
                objectFit="contain"
              />
            );
          })}
        </Flex>
        <Separator mt={8} mb={4} />
        <Flex justifyContent="space-between">
          <Text color="gray.900" fontSize="sm">
            © 2025 Rovers Inc. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Footer;
