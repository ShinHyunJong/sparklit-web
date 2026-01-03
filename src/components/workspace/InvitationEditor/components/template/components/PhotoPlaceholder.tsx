import { Flex } from '@chakra-ui/react';

import TextEditorViewer from '../../inputs/TextEditor/viewer';

function PhotoPlaceholder({ placeholder }: { placeholder?: string }) {
  return (
    <Flex align="center" p={4} w="full" h="300px" bg="gray.300">
      {placeholder && <TextEditorViewer verticalCenter content={placeholder} />}
    </Flex>
  );
}
export default PhotoPlaceholder;
