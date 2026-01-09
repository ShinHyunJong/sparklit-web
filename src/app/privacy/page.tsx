import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function PrivacyPage() {
  return (
    <Box bg="#F7F3EF" color="#111827" minH="100vh" py={{ base: 10, md: 16 }}>
      <Container maxW="3xl">
        <Stack gap={{ base: 4, md: 6 }}>
          <Heading as="h1" size="lg">
            Privacy Policy
          </Heading>
          <Text fontSize="sm" color="#6B7280">
            Effective date: 2025-01-01
          </Text>
          <Text>
            This Privacy Policy explains how Sparklit collects, uses, and
            shares information.
          </Text>
          <Heading as="h2" size="md">
            Information We Collect
          </Heading>
          <Stack gap={2} pl={4}>
            <Text>- Account email address collected at sign up.</Text>
            <Text>
              - RSVP responses when enabled, including visitor name, email, and
              phone number.
            </Text>
          </Stack>
          <Heading as="h2" size="md">
            How We Use Information
          </Heading>
          <Stack gap={2} pl={4}>
            <Text>- Provide and improve the service.</Text>
            <Text>- Deliver RSVP submissions to invitation hosts.</Text>
            <Text>- Communicate service updates and support.</Text>
          </Stack>
          <Heading as="h2" size="md">
            Sharing
          </Heading>
          <Text>
            We share information with service providers that help operate
            Sparklit. We do not sell personal information.
          </Text>
          <Heading as="h2" size="md">
            Retention and Security
          </Heading>
          <Text>
            We retain data as needed to provide the service and comply with
            legal obligations. We use reasonable safeguards to protect data.
          </Text>
          <Heading as="h2" size="md">
            Contact
          </Heading>
          <Text>
            For privacy questions, contact us at privacy@sparklit.co.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
