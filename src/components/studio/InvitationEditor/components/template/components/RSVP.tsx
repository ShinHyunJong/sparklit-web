import { Center, Flex, Icon, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Fade } from 'react-awesome-reveal';
import { LuSend } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import RSVPDialog from './RSVPDialog';
import SubHeader from './SubHeader';

function RSVP() {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  return (
    <Fade triggerOnce>
      <Flex direction="column">
        <Center flexDirection="column">
          <SubHeader title="R.S.V.P"></SubHeader>
          <Icon fontSize={24} color={pointColor} mb={6}>
            <LuSend />
          </Icon>
        </Center>
        <Center textAlign="center">
          <Flex direction="column" fontSize="sm" color="gray.600">
            <Text>Please let the bride and groom know in advance</Text>
            <Text>if you can attend or not.</Text>
          </Flex>
        </Center>
        <Center>
          <RSVPDialog></RSVPDialog>
        </Center>
      </Flex>
    </Fade>
  );
}

export default RSVP;
