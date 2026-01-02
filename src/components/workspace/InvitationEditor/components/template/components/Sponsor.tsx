import { Box, Center, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';

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
        <Slide triggerOnce direction="up" duration={500} cascade damping={0.8}>
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
        </Slide>
      </Stack>
    </Box>
  );
}

export default Sponsor;
