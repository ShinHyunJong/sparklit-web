import { Center, Flex, Text } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';

import RSVPDialog from './RSVPDialog';
import SubHeader from './SubHeader';

function RSVP() {
  return (
    <Fade triggerOnce>
      <Flex direction="column">
        <SubHeader title="R.S.V.P"></SubHeader>
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
