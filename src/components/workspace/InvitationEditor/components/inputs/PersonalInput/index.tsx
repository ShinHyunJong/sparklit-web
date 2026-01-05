import { Accordion, Flex, Separator, Text } from '@chakra-ui/react';

import BrideInput from './BrideInput';
import GroomInput from './GroomInput';

type PersonalInputProps = {
  brideLastName: string;
  brideFirstName: string;
  brideMiddleName: string;
  brideMomName: string;
  brideDadName: string;
  groomLastName: string;
  groomFirstName: string;
  groomMiddleName: string;
  groomMomName: string;
  groomDadName: string;
};

function PersonalInput({
  brideLastName,
  brideFirstName,
  brideMiddleName,
  brideMomName,
  brideDadName,
  groomLastName,
  groomFirstName,
  groomMiddleName,
  groomMomName,
  groomDadName,
}: PersonalInputProps) {
  return (
    <Accordion.Item
      borderBottomWidth={0}
      borderRadius={'sm'}
      value="personal"
      bg="white"
    >
      <Accordion.ItemTrigger borderBottomWidth={1}>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Personal Information</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          <Flex p={4} flexDirection="column" gap={4}>
            <GroomInput
              lastName={groomLastName}
              firstName={groomFirstName}
              middleName={groomMiddleName}
              momName={groomMomName}
              dadName={groomDadName}
            ></GroomInput>
            <Separator></Separator>
            <BrideInput
              lastName={brideLastName}
              firstName={brideFirstName}
              middleName={brideMiddleName}
              momName={brideMomName}
              dadName={brideDadName}
            ></BrideInput>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default PersonalInput;
