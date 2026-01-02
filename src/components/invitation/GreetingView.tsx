// components/invitation/sections/Greeting/GreetingView.tsx
import { Center, Flex, Heading, Separator, Text } from '@chakra-ui/react';
import { Fade } from 'react-awesome-reveal';

import TextEditorViewer from '../workspace/InvitationEditor/components/inputs/TextEditor/viewer';
import SubHeader from '../workspace/InvitationEditor/components/template/components/SubHeader';

export type GreetingViewProps = {
  title: string;
  content: any; // TextEditorViewer에 맞는 타입으로 바꿔도 됨
  pointColor?: string;
  groomFirstName?: string;
  brideFirstName?: string;
};

export default function GreetingView({
  title,
  content,
  pointColor = 'black',
  groomFirstName = '',
  brideFirstName = '',
}: GreetingViewProps) {
  return (
    <Fade triggerOnce>
      <Flex direction="column" gap={6} px={4}>
        <Center>
          <Flex direction="column" justifyContent="center" alignItems="center">
            <SubHeader title="INVITATION" />
            <Heading color={pointColor}>{title}</Heading>
          </Flex>
        </Center>
        <TextEditorViewer content={content} />

        <Center>
          <Separator w={12} borderWidth={1} my={4} />
        </Center>

        <Center>
          <Text fontSize="sm" color="gray.500">
            From. {groomFirstName} & {brideFirstName}
          </Text>
        </Center>
      </Flex>
    </Fade>
  );
}
