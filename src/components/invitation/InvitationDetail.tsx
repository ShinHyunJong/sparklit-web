'use client';

import { Box, Flex, Stack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { COMPONENT_MAP } from '@/configs/LayoutComponent';
import { useInvitationDetail } from '@/hooks/invitation';
import { useSetInvitation } from '@/hooks/invitation/set';
import type { Invitation } from '@/types/model';

import Ending from '../workspace/InvitationEditor/components/template/components/Ending';
import MainTemplate from '../workspace/InvitationEditor/components/template/components/MainTemplate';

function InvitationDetail({ invitation }: { invitation: Invitation }) {
  const { invitationDetail } = useInvitationDetail(invitation);
  useSetInvitation(invitationDetail);
  const layoutSettings = useAtomValue(invitationEditorAtom.layoutOrderAtom);
  const existingIds = layoutSettings.map((item) => item.id);
  const missingKeys = Object.keys(COMPONENT_MAP).filter(
    (key) => !existingIds.includes(key),
  );

  return (
    <Flex
      bg={invitationDetail?.bgColor || ''}
      position="relative"
      w="full"
      direction="column"
      pb={16}
    >
      <MainTemplate></MainTemplate>
      <Stack spaceY={20}>
        {/* [Step 1] DB 순서 및 가시성 설정에 따른 렌더링 */}
        {layoutSettings
          .filter((item) => item.visible) // visible이 true인 것만 출력
          .map((item) => {
            const Component = COMPONENT_MAP[item.id];
            if (!Component) return null;

            return (
              <Box key={item.id} id={item.id}>
                {Component}
              </Box>
            );
          })}

        {missingKeys.map((key) => (
          <Box key={key} id={key}>
            {COMPONENT_MAP[key]}
          </Box>
        ))}
        <Ending></Ending>
      </Stack>
    </Flex>
  );
}

export default InvitationDetail;
