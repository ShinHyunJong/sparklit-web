import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { Slide } from 'react-awesome-reveal';
import { LuExternalLink, LuGift } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';

import SubHeader from './SubHeader';

function MonetaryGift() {
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);

  // 아톰에서 업데이트된 필드값 가져오기
  const bankAccount = useAtomValue(invitationEditorAtom.bankAccount);
  const wishlistUrl = useAtomValue(invitationEditorAtom.wishlistUrl);
  const wishlistText = useAtomValue(invitationEditorAtom.wishlistText);

  return (
    <Box pb={20}>
      <Center flexDirection="column" mb={6}>
        {/* 헤더 타이틀 변경 */}
        <SubHeader title="Monetary & Gifts"></SubHeader>
        <Icon fontSize={24} mb={6} color={pointColor}>
          <LuGift />
        </Icon>
      </Center>

      <Stack mt={4} gap={12}>
        <Slide triggerOnce direction="up" duration={800} cascade damping={0.2}>
          {/* 1. 계좌 정보 섹션 */}
          {bankAccount && (
            <Box px={6}>
              <Center mb={4}>
                <Text
                  letterSpacing="wider"
                  fontFamily="crimsonPro"
                  fontSize="lg"
                >
                  BANK ACCOUNT
                </Text>
              </Center>
              <Box
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.100"
                textAlign="center"
              >
                <Text
                  whiteSpace="pre-line"
                  fontSize="md"
                  color="gray.600"
                  lineHeight="tall"
                >
                  {bankAccount}
                </Text>
              </Box>
            </Box>
          )}

          {/* 2. 위시리스트 섹션 */}

          <Box px={6}>
            <Center mb={6}>
              <Text fontSize="lg" letterSpacing="wider" fontFamily="crimsonPro">
                GIFT WISHLIST
              </Text>
            </Center>
            {wishlistText && (
              <Center whiteSpace="pre-line" textAlign="center" mb={6}>
                <Text color="gray.600">{wishlistText}</Text>
              </Center>
            )}
            <Flex direction="column" gap={4}>
              {wishlistUrl && (
                <Button
                  asChild
                  variant="outline"
                  borderColor={pointColor}
                  color={pointColor}
                  w="full"
                  size="sm"
                  borderRadius="full"
                >
                  <Link
                    href={wishlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Flex align="center" gap={2}>
                      View Wishlist <LuExternalLink size={14} />
                    </Flex>
                  </Link>
                </Button>
              )}
            </Flex>
          </Box>
        </Slide>
      </Stack>
    </Box>
  );
}

export default MonetaryGift;
