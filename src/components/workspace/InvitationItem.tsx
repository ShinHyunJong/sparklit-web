import { Button, Card, Image } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { S3_BUCKET_URL } from '@/configs/domain.config';
import type { Invitation } from '@/types/model';

function InvitationItem({ invitation }: { invitation: Invitation }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/workspace/create?uid=${invitation.uniqueId}`);
  };
  const handleRSVPClick = () => {
    router.push(`/rsvp?uid=${invitation.uniqueId}`);
  };

  const isTitleSetup = invitation.groomFirstName && invitation.brideFirstName;
  const title = isTitleSetup
    ? `${invitation.groomFirstName} & ${invitation.brideFirstName}`
    : 'Untitled';

  const imageUrl = invitation.ogImageKey
    ? invitation.ogImageKey
    : 'assets/ogImage.jpg';

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={S3_BUCKET_URL + imageUrl}
        alt={`${invitation.uniqueId} cover photo`}
      />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {dayjs(invitation.createdAt).format('MMMM D, YYYY')}
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button onClick={handleClick} size="sm" variant="solid">
          Edit
        </Button>
        <Button onClick={handleRSVPClick} size="sm" variant="outline">
          RSVP
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default InvitationItem;
