import { Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import day from '@/helpers/date.helper';
import type { Invitation } from '@/types/model';

function InvitationItem({ invitation }: { invitation: Invitation }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/workspace/create?uid=${invitation.uniqueId}`);
  };
  return (
    <Flex
      role="button"
      onClick={handleClick}
      cursor="pointer"
      borderRadius="sm"
      borderWidth={1}
      borderColor="gray.200"
      direction="column"
      bg="white"
      p={4}
    >
      <Heading as="h3" size="md" mb={2}>
        {invitation.title || 'Untitled'}
      </Heading>
      <Flex alignSelf="end">
        <Text fontSize="sm" color="gray.500">
          {day(invitation.createdAt).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
}

export default InvitationItem;
