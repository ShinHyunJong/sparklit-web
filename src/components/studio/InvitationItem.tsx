import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { FaEye, FaFacebook, FaFacebookMessenger } from 'react-icons/fa6';
import { LuLink, LuShare2 } from 'react-icons/lu';

import { S3_BUCKET_URL } from '@/configs/domain.config';
import { triggerInvitationRevalidate } from '@/lib/revalidateInvitation';
import { toaster } from '@/components/ui/toaster';
import type { Invitation } from '@/types/model';

function InvitationItem({ invitation }: { invitation: Invitation }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/studio/create?uid=${invitation.uniqueId}`);
  };
  const handleRSVPClick = () => {
    router.push(`/rsvp?uid=${invitation.uniqueId}`);
  };
  const inviteUrl = `https://sparklit.co/invitation/${invitation.uniqueId}`;
  const revalidateInvite = () =>
    triggerInvitationRevalidate(invitation.uniqueId);

  const handleOpenPreview = () => {
    void revalidateInvite();
    window.open(inviteUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      void revalidateInvite();
      toaster.create({ title: 'Link copied to clipboard.', type: 'success' });
    } catch {
      toaster.create({ title: 'Failed to copy link.', type: 'error' });
    }
  };

  const handleShareFacebook = () => {
    void revalidateInvite();
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      inviteUrl,
    )}`;
    window.open(
      facebookShareUrl,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  };

  const handleShareMessenger = () => {
    void revalidateInvite();
    const messengerUrl = `https://www.facebook.com/dialog/send?app_id=1654128312237206&link=${encodeURIComponent(
      inviteUrl,
    )}&redirect_uri=${encodeURIComponent('https://sparklit.co')}&v=${Date.now()}`;

    if (/iPhone|Android/i.test(navigator.userAgent)) {
      window.location.href = `fb-messenger://share?link=${encodeURIComponent(
        inviteUrl,
      )}`;
    } else {
      window.open(
        messengerUrl,
        'messenger-share-dialog',
        'width=800,height=600',
      );
    }
  };

  const isTitleSetup = invitation.groomFirstName && invitation.brideFirstName;
  const title = isTitleSetup
    ? `${invitation.groomFirstName} & ${invitation.brideFirstName}`
    : 'Untitled';

  const imageUrl = invitation.ogImageKey
    ? invitation.ogImageKey
    : 'assets/ogImage.jpg';

  return (
    <Card.Root maxW="sm" overflow="hidden" position="relative">
      <Box position="absolute" top={2} right={2} zIndex={1}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box bg="blackAlpha.600" borderRadius="full" p="1px">
              <IconButton
                aria-label="More actions"
                size="xs"
                rounded="full"
                variant="ghost"
                color="white"
                _hover={{ bg: 'blackAlpha.400' }}
                _active={{ bg: 'blackAlpha.500' }}
              >
                <LuShare2 />
              </IconButton>
            </Box>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  onClick={handleOpenPreview}
                  value="preview"
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <Icon boxSize={3.5}>
                      <FaEye />
                    </Icon>
                    <Text fontSize="sm">Open Preview</Text>
                  </Flex>
                </Menu.Item>
                <Menu.Item
                  onClick={handleCopyLink}
                  value="copy-link"
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <Icon boxSize={3.5}>
                      <LuLink />
                    </Icon>
                    <Text fontSize="sm">Copy Link</Text>
                  </Flex>
                </Menu.Item>
                <Menu.Item
                  onClick={handleShareFacebook}
                  value="facebook"
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <Icon color="blue.600" boxSize={3.5}>
                      <FaFacebook />
                    </Icon>
                    <Text fontSize="sm">Share on Feed</Text>
                  </Flex>
                </Menu.Item>
                <Menu.Item
                  onClick={handleShareMessenger}
                  value="messenger"
                  cursor="pointer"
                >
                  <Flex align="center" gap={2}>
                    <Icon color="blue.600" boxSize={3.5}>
                      <FaFacebookMessenger />
                    </Icon>
                    <Text fontSize="sm">Share on Messenger</Text>
                  </Flex>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>
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
