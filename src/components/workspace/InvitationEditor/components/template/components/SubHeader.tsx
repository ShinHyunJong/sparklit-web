import { Center, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';
function SubHeader({ title }: { title: string }) {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  return (
    <Center mb={4}>
      <Text letterSpacing={2} color={pointColor}>
        {title.toUpperCase()}
      </Text>
    </Center>
  );
}
export default SubHeader;
