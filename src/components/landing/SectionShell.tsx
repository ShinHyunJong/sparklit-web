import { Box, Container } from '@chakra-ui/react';

const SectionShell = ({
  children,
  maxW = '6xl',
}: {
  children: React.ReactNode;
  maxW?: string;
}) => {
  return (
    <Container maxW={maxW} px={{ base: 4, md: 6 }}>
      <Box
        bg="#FBF8F5"
        borderRadius="3xl"
        borderWidth="1px"
        borderColor="#EFE6DF"
        px={{ base: 5, md: 10 }}
        py={{ base: 8, md: 12 }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default SectionShell;
