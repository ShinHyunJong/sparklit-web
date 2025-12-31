import { Box, Container, Flex, Heading } from '@chakra-ui/react';

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <Container h="100%">
      <Flex
        direction="column"
        h="100%"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box mb={8}>
          <Heading fontSize="3xl">Sparklit</Heading>
        </Box>
        {children}
      </Flex>
    </Container>
  );
}
