'use client';

import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';

export default function TermsPage() {
  const router = useRouter();

  return (
    <Box bg="#F7F3EF" color="#111827" minH="100vh" py={{ base: 10, md: 16 }}>
      <Container maxW="3xl">
        <Stack gap={{ base: 4, md: 6 }}>
          <Flex>
            <IconButton
              aria-label="Go back"
              onClick={() => router.back()}
              variant="outline"
              rounded="full"
              size="sm"
            >
              <Icon>
                <LuArrowLeft />
              </Icon>
            </IconButton>
          </Flex>
          <Heading as="h1" size="lg">
            Terms of Service
          </Heading>
          <Text fontSize="sm" color="#6B7280">
            Effective date: 2025-01-01
          </Text>
          <Text>
            These Terms of Service govern your use of Sparklit. By creating an
            account or using the service, you agree to these terms.
          </Text>
          <Heading as="h2" size="md">
            Accounts and Access
          </Heading>
          <Stack gap={2} pl={4}>
            <Text>
              - We collect and store your email address when you sign up.
            </Text>
            <Text>
              - You are responsible for maintaining the security of your
              account.
            </Text>
          </Stack>
          <Heading as="h2" size="md">
            RSVP and Guest Data
          </Heading>
          <Text>
            If you enable RSVP, you may collect visitor name, email, and phone
            number. You are responsible for obtaining any necessary consent from
            your guests.
          </Text>
          <Heading as="h2" size="md">
            Acceptable Use
          </Heading>
          <Stack gap={2} pl={4}>
            <Text>- Do not use the service for unlawful purposes.</Text>
            <Text>
              - Do not upload or share content that infringes on others&apos;
              rights.
            </Text>
          </Stack>
          <Heading as="h2" size="md">
            Changes and Termination
          </Heading>
          <Text>
            We may update these terms from time to time. Continued use of the
            service means you accept the updated terms. We may suspend or
            terminate access for violations of these terms.
          </Text>
          <Heading as="h2" size="md">
            Contact
          </Heading>
          <Text>
            For questions about these Terms, contact us at support@sparklit.co.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
