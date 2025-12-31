import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

function Entourage() {
  const bestMan = useAtomValue(invitationEditorAtom.bestMan);
  const maidOfHonor = useAtomValue(invitationEditorAtom.maidOfHonor);
  const groomsMen = useAtomValue(invitationEditorAtom.groomsMen);
  const bridesMaids = useAtomValue(invitationEditorAtom.bridesMaids);

  // 2개씩 짝지어 출력하기 위해 데이터를 구성합니다.
  const groups = [
    { label: 'BEST MAN', value: bestMan },
    { label: 'MAID OF HONOR', value: maidOfHonor },
    { label: 'GROOMSMEN', value: groomsMen },
    { label: 'BRIDESMAIDS', value: bridesMaids },
  ];

  return (
    <Box>
      <Center>
        <SubHeader title="Entourage" />
      </Center>
      <Box mt={8} px={4}>
        {/* SimpleGrid를 사용하여 2열 구조를 만듭니다. */}
        <SimpleGrid columns={2} gap={10}>
          {groups.map((item) => (
            <Box key={item.label}>
              <Center mb={4}>
                <Text
                  fontFamily="crimsonPro"
                  fontSize="md"
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
                >
                  {item.value || '-'}
                </Text>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Entourage;
