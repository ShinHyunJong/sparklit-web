'use client';

import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';

import AddInvitation from '@/components/studio/AddInvitation';
import InvitationItem from '@/components/studio/InvitationItem';
import { useAuth } from '@/hooks/auth';
import { useInvitationList } from '@/hooks/invitation';

function StudioPage() {
  const { user } = useAuth();
  const { invitationList, isLoading } = useInvitationList();

  return (
    <Box
      w="full"
      maxW="6xl"
      mx="auto"
      pt={{ base: 3, md: 6 }}
      pb={{ base: 6, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <Heading mb={{ base: 4, md: 8 }} size={{ base: 'lg', md: 'xl' }}>
        Invitations
      </Heading>

      <SimpleGrid
        // ✅ Mobile: 1 column (single vertical list)
        // ✅ Tablet/Desktop: 2~3 columns
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={{ base: 3, md: 4 }}
      >
        {isLoading &&
          [0, 1].map((i) => (
            <Card.Root key={`skeleton-${i}`} maxW="sm" overflow="hidden">
              <Skeleton w="full" aspectRatio={4 / 3} />
              <Card.Body gap="2">
                <SkeletonText noOfLines={2} />
              </Card.Body>
            </Card.Root>
          ))}
        {invitationList.map((invitation) => (
          <InvitationItem
            key={`invitation-${invitation.id}`}
            invitation={invitation}
          />
        ))}
        <AddInvitation />
      </SimpleGrid>
    </Box>
  );
}

export default StudioPage;
