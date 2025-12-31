import { Container } from '@chakra-ui/react';
import { notFound } from 'next/navigation';

import InvitationDetail from '@/components/invitation/InvitationDetail';
import { API_ENDPOINT } from '@/configs/request.config';

async function InvitationDetailPage({
  params,
}: {
  params: Promise<{ invitationUid: string }>;
}) {
  const { invitationUid } = await params;
  console.log(invitationUid);
  const res = await fetch(`${API_ENDPOINT}/invitation/${invitationUid}`, {
    cache: 'no-store',
  });
  console.log(res);
  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error('Failed to fetch invitation');
  const invitation = await res.json();

  return (
    <Container maxW="lg">
      <InvitationDetail invitation={invitation}></InvitationDetail>
    </Container>
  );
}

export default InvitationDetailPage;
