import { Box, Center, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';
import { LuUsers } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

function Entourage() {
  const bestMan = useAtomValue(invitationEditorAtom.bestMan);
  const maidOfHonor = useAtomValue(invitationEditorAtom.maidOfHonor);
  const groomsMen = useAtomValue(invitationEditorAtom.groomsMen);
  const bridesMaids = useAtomValue(invitationEditorAtom.bridesMaids);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  // 2개씩 짝지어 출력하기 위해 데이터를 구성합니다.
  const groups = [
    { label: 'BEST MAN', value: bestMan },
    { label: 'MAID OF HONOR', value: maidOfHonor },
    { label: 'GROOMSMEN', value: groomsMen },
    { label: 'BRIDESMAIDS', value: bridesMaids },
  ];

  return (
    <Slide triggerOnce direction="up" duration={800} cascade damping={0.6}>
      <Box>
        <Center flexDirection="column" mb={6}>
          <SubHeader title="Entourage"></SubHeader>
          <Icon fontSize={24} color={pointColor}>
            <LuUsers />
          </Icon>
        </Center>

        <Box pt={4} px={4}>
          {/* SimpleGrid를 사용하여 2열 구조를 만듭니다. */}
          <SimpleGrid columns={2} gap={10}>
            {groups.map((item) => (
              <Box key={item.label}>
                <Center mb={4}>
                  <Text
                    fontFamily="crimsonPro"
                    fontSize="lg"
                    textAlign="center"
                    letterSpacing="wider"
                  >
                    {item.label}
                  </Text>
                </Center>
                <Center>
                  <Text
                    whiteSpace="pre-line"
                    textAlign="center"
                    lineHeight="tall"
                    color="gray.600"
                  >
                    {item.value || '-'}
                  </Text>
                </Center>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Slide>
  );
}

export default Entourage;
