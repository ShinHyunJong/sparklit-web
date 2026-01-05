// components/invitation/sections/Greeting/GreetingView.tsx
import { Center, Flex, Heading, Icon, Separator, Text } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';
import { LuMailOpen } from 'react-icons/lu';

import TextEditorViewer from '../workspace/InvitationEditor/components/inputs/TextEditor/viewer';
import SubHeader from '../workspace/InvitationEditor/components/template/components/SubHeader';

export type GreetingViewProps = {
  title: string;
  content: any; // TextEditorViewer에 맞는 타입으로 바꿔도 됨
  pointColor?: string;
  groomFirstName?: string;
  brideFirstName?: string;
  groomMiddleName?: string;
  brideMiddleName?: string;
  brideLastName?: string;
  groomLastName?: string;
  groomDadName?: string;
  groomMomName?: string;
  brideMomName?: string;
  brideDadName?: string;
  fontFamily: string;
};

export default function GreetingView({
  title,
  content,
  pointColor = 'black',
  groomFirstName = '',
  brideFirstName = '',
  groomMiddleName = '',
  brideMiddleName = '',
  brideLastName = '',
  groomLastName = '',
  groomDadName = '',
  groomMomName = '',
  brideMomName = '',
  brideDadName = '',
  fontFamily = '',
}: GreetingViewProps) {
  return (
    <Fade triggerOnce>
      <Flex direction="column" gap={6} px={4}>
        <Center>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <SubHeader title="INVITATION" />
            <Icon mb={6}>
              <LuMailOpen size={24} color={pointColor} />
            </Icon>

            <Heading fontFamily={fontFamily} color={pointColor}>
              {title}
            </Heading>
          </Flex>
        </Center>

        <TextEditorViewer content={content} />
        <Center>
          <Separator w={12} borderWidth={1} my={4} />
        </Center>

        <Flex justifyContent="center" gap={2}>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text>Mr. {groomDadName}</Text>
            <Text>Mrs. {groomMomName}</Text>
          </Flex>
          <Center>
            <Text mx={2}>&amp;</Text>
          </Center>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text>Mr. {brideDadName}</Text>
            <Text>Mrs. {brideMomName}</Text>
          </Flex>
        </Flex>
        <Center fontSize="lg" flexDirection="column" gap={1} my={4}>
          <Text>
            {groomFirstName} {groomMiddleName} {groomLastName}
          </Text>
          <Text>
            {brideFirstName} {brideMiddleName} {brideLastName}
          </Text>
        </Center>
      </Flex>
    </Fade>
  );
}
