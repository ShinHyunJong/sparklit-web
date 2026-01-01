import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

function Sponsor() {
  const primarySponsor = useAtomValue(invitationEditorAtom.primarySponsor);
  const secondarySponsor = useAtomValue(invitationEditorAtom.secondarySponsor);
  return (
    <Box>
      <Center>
        <SubHeader title="Sponsors"></SubHeader>
      </Center>
      <Stack mt={8} spaceY={4}>
        <Box p={4}>
          <Center mb={4}>
            <Text letterSpacing="wider" fontFamily="crimsonPro" fontSize="lg">
              PRINCIPAL SPONSOR
            </Text>
          </Center>
          <Center>
            <Text whiteSpace="pre-line">{primarySponsor}</Text>
          </Center>
        </Box>
        <Box p={4}>
          <Center mb={4}>
            <Text letterSpacing="wider" fontFamily="crimsonPro" fontSize="lg">
              SECONDARY SPONSOR
            </Text>
          </Center>
          <Center>
            <Text whiteSpace="pre-line">{secondarySponsor}</Text>
          </Center>
        </Box>
      </Stack>
    </Box>
  );
}

export default Sponsor;
