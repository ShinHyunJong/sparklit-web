import { Container } from '@chakra-ui/react';

export default async function InvitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Container maxW="lg">{children}</Container>;
}
