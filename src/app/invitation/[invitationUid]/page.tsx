import { Container } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import InvitationDetail from '@/components/invitation/InvitationDetail';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { API_ENDPOINT } from '@/configs/request.config';
import type { Invitation } from '@/types/model';

async function InvitationDetailPage({
  params,
}: {
  params: Promise<{ invitationUid: string }>;
}) {
  const { invitationUid } = await params;
  const res = await fetch(`${API_ENDPOINT}/invitation/${invitationUid}`, {
    cache: 'no-store',
    next: { revalidate: 60 },
  });
  if (res.status === 404) return notFound();
  if (!res.ok) throw new Error('Failed to fetch invitation');
  const invitation = await res.json();

  return (
    <Container maxW="lg" px={0}>
      <InvitationDetail invitation={invitation}></InvitationDetail>
    </Container>
  );
}

export async function generateMetadata(
  { params, searchParams },
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const { invitationUid } = await params;
  const res = await fetch(`${API_ENDPOINT}/invitation/${invitationUid}`, {
    cache: 'no-store',
  });
  const invitation: Invitation = await res.json();

  if (!invitation) return notFound();
  const groomName = invitation.groomFirstName || 'Groom';
  const brideName = invitation.brideFirstName || 'Bride';

  const title = 'Welcome to ' + groomName + ' & ' + brideName + "'s Wedding";
  const description = 'You are invited!';
  const url = `https://sparklit.co/invitation/${invitationUid}`;
  const ogImageUrl = invitation.ogImageKey
    ? `${S3_BUCKET_URL}${invitation.ogImageKey}`
    : `${S3_BUCKET_URL}/assets/ogImage.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Invitation OgImage',
        },
      ],
    },
  };
}

export default InvitationDetailPage;
