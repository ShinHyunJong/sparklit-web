import { Box, Flex, GridItem, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { postInvitationApi } from '@/hooks/invitation/api';

function AddInvitation() {
  const router = useRouter();
  const [postLoading, setPostLoading] = useState(false);
  const handleClick = async () => {
    try {
      setPostLoading(true);
      const invitation = await postInvitationApi();
      router.push(`/studio/create?uid=${invitation.uniqueId}`);
    } catch (error) {
      console.error('Error creating invitation:', error);
    } finally {
      setPostLoading(false);
    }
  };
  return (
    <GridItem>
      <Flex
        role="button"
        onClick={handleClick}
        cursor="pointer"
        borderRadius="sm"
        borderWidth={1}
        borderColor="gray.200"
        justifyContent="center"
        alignItems="center"
        direction="column"
        bg="white"
        py={4}
      >
        {postLoading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <Box color="brand.400" mb={2}>
              <FaPlus></FaPlus>
            </Box>
            <Text fontSize="sm" color="gray.500">
              New Invitation
            </Text>
          </>
        )}
      </Flex>
    </GridItem>
  );
}

export default AddInvitation;
