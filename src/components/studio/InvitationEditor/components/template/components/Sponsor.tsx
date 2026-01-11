import { Box, Center, Icon, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';
import { LuGift } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

function Sponsor() {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const primarySponsor = useAtomValue(invitationEditorAtom.primarySponsor);
  const secondarySponsor = useAtomValue(invitationEditorAtom.secondarySponsor);

  return (
    <Box>
      <Center flexDirection="column" mb={6}>
        <SubHeader title="Sponsors"></SubHeader>
        <Icon fontSize={24} color={pointColor}>
          <LuGift></LuGift>
        </Icon>
      </Center>
      <Stack spaceY={4}>
        <Slide triggerOnce direction="up" duration={800} cascade damping={0.5}>
          <Box p={3}>
            <Center mb={4}>
              <Text letterSpacing="wider" fontFamily="crimsonPro" fontSize="lg">
                PRINCIPAL SPONSOR
              </Text>
            </Center>
            <Center>
              <Text textAlign="center" color="gray.600" whiteSpace="pre-line">
                {primarySponsor}
              </Text>
            </Center>
          </Box>
          <Box p={4}>
            <Center mb={4}>
              <Text letterSpacing="wider" fontFamily="crimsonPro" fontSize="lg">
                SECONDARY SPONSOR
              </Text>
            </Center>
            <Center>
              <Text textAlign="center" color="gray.600" whiteSpace="pre-line">
                {secondarySponsor}
              </Text>
            </Center>
          </Box>
        </Slide>
      </Stack>
    </Box>
  );
}

export default Sponsor;
