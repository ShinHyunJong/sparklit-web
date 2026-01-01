'use client';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import AddInvitation from '@/components/workspace/AddInvitation';
import InvitationItem from '@/components/workspace/InvitationItem';
import { useAuth } from '@/hooks/auth';
import { useInvitationList } from '@/hooks/invitation';

function WorkspacePage() {
  const { user } = useAuth();
  const { invitationList } = useInvitationList();
  return (
    <Box pt={4}>
      <Heading mb={8}>Invitations</Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={4}>
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

export default WorkspacePage;
