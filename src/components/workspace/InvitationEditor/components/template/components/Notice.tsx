import { Center, Flex, Icon } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { LuBell } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import TextEditorViewer from '../../inputs/TextEditor/viewer';
import SubHeader from './SubHeader';

function Notice() {
  const content = useAtomValue(invitationEditorAtom.notice);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);

  if (!content) return null;
  return (
    <Flex direction="column" gap={6} px={4}>
      <Center flexDirection="column">
        <Flex direction="column" justifyContent="center" alignItems="center">
          <SubHeader title="NOTICE"></SubHeader>
        </Flex>
        <Icon color={pointColor}>
          <LuBell size={24}></LuBell>
        </Icon>
      </Center>
      <TextEditorViewer content={content}></TextEditorViewer>
    </Flex>
  );
}

export default Notice;
