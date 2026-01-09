'use client';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import AddInvitation from '@/components/studio/AddInvitation';
import InvitationItem from '@/components/studio/InvitationItem';
import { useAuth } from '@/hooks/auth';
import { useInvitationList } from '@/hooks/invitation';

function StudioPage() {
  const { user } = useAuth();
  const { invitationList } = useInvitationList();

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
