import { Container } from '@chakra-ui/react';

export default async function InvitationLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return <Container maxW="lg">{children}</Container>;
}
