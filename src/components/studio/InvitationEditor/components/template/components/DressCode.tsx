import { Box, Center, Circle, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';
import { LuShirt } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

const circleSize = 36;

function DressCode() {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const mainColor = useAtomValue(invitationEditorAtom.dressCodeMainColor);
  const subColor = useAtomValue(invitationEditorAtom.dressCodeSubColor);
  const thirdColor = useAtomValue(invitationEditorAtom.dressCodeThirdColor);
  const gentleman = useAtomValue(invitationEditorAtom.dressCodeGentleman);
  const lady = useAtomValue(invitationEditorAtom.dressCodeLady);

  return (
    <Slide triggerOnce direction="up" duration={500} cascade damping={0.8}>
      <Box>
        <Center flexDirection="column" mb={6}>
          <SubHeader title="Dress Code"></SubHeader>
          <Icon color={pointColor} fontSize={24} mb={6}>
            <LuShirt></LuShirt>
          </Icon>
        </Center>
        <Center mt={4}>
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
                GENTLEMEN
              </Text>
            </Center>
            <Center textAlign="center">
              <Text color="gray.600" whiteSpace="pre-line">
                {gentleman}
              </Text>
            </Center>
          </Box>
          <Box p={4}>
            <Center mb={4}>
              <Text fontFamily="crimsonPro" fontSize="lg">
                LADIES
              </Text>
            </Center>
            <Center textAlign="center">
              <Text color="gray.600" whiteSpace="pre-line">
                {lady}
              </Text>
            </Center>
          </Box>
        </Stack>
      </Box>
    </Slide>
  );
}

export default DressCode;
