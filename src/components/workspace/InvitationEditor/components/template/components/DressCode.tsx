import { Box, Center, Circle, Flex, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

const circleSize = 36;

function DressCode() {
  const mainColor = useAtomValue(invitationEditorAtom.dressCodeMainColor);
  const subColor = useAtomValue(invitationEditorAtom.dressCodeSubColor);
  const thirdColor = useAtomValue(invitationEditorAtom.dressCodeThirdColor);
  const gentleman = useAtomValue(invitationEditorAtom.dressCodeGentleman);
  const lady = useAtomValue(invitationEditorAtom.dressCodeLady);

  return (
    <Box>
      <Center>
        <SubHeader title="Dress Code"></SubHeader>
      </Center>
      <Center>
        <Flex gap={1}>
          <Circle
            w={`${circleSize}px`}
            h={`${circleSize}px`}
            bg={mainColor && mainColor.toString('hex')}
          ></Circle>
          <Circle
            w={`${circleSize}px`}
            h={`${circleSize}px`}
            bg={subColor && subColor.toString('hex')}
          ></Circle>
          <Circle
            w={`${circleSize}px`}
            h={`${circleSize}px`}
            bg={thirdColor && thirdColor.toString('hex')}
          ></Circle>
        </Flex>
      </Center>
      <Stack mt={8} spaceY={4}>
        <Box p={4}>
          <Center mb={4}>
            <Text fontFamily="crimsonPro" fontSize="lg">
              GENTLEMAN
            </Text>
          </Center>
          <Center>
            <Text whiteSpace="pre-line">{gentleman}</Text>
          </Center>
        </Box>
        <Box p={4}>
          <Center mb={4}>
            <Text fontFamily="crimsonPro" fontSize="lg">
              LADY
            </Text>
          </Center>
          <Center>
            <Text whiteSpace="pre-line">{lady}</Text>
          </Center>
        </Box>
      </Stack>
    </Box>
  );
}

export default DressCode;
