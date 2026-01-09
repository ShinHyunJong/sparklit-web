import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box pb={{ base: 10, md: 12 }}>
      <Container maxW="6xl" px={{ base: 4, md: 6 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          gap={4}
          color="#9CA3AF"
          fontSize="xs"
        >
          <Text>
            © {new Date().getFullYear()} Sparklit. All rights reserved.
          </Text>
          <HStack gap={4}>
            <Text as="a" href="#terms" cursor="pointer">
              Terms
            </Text>
            <Text as="a" href="#privacy" cursor="pointer">
              Privacy
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
