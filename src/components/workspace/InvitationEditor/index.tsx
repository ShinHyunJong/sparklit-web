'use client';

import { Accordion, Box, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { layoutConstants } from '@/constants/layout';
import { useInvitationDetail } from '@/hooks/invitation';

import DateInput from './components/inputs/DateInput';
import DressCodeInput from './components/inputs/DressCodeInput';
import EntourageInput from './components/inputs/EntourageInput';
import MusicInput from './components/inputs/MusicInput';
import OrderInput from './components/inputs/OrderInput';
import PersonalInput from './components/inputs/PersonalInput';
import PhotoInput from './components/inputs/PhotoInput';
import PlaceInput from './components/inputs/PlaceInput';
import SponsorInput from './components/inputs/SponsorInput';
import TemplateInput from './components/inputs/TemplateInput';
import ThemeInput from './components/inputs/ThemeInput/ index';
import PreviewInvitation from './components/PreviewInvitation';
const DynamicGreetingInput = dynamic(
  () => import('./components/inputs/GreetingInput'), // 1단계에서 만든 Quill 컴포넌트 경로
  {
    loading: () => <Spinner />, // 로딩 중에 표시할 컴포넌트
    ssr: false, // **이 부분이 서버 렌더링을 막아주는 핵심입니다.**
  },
);
const DynamicNoticeInput = dynamic(
  () => import('./components/inputs/NoticeInput'), // 1단계에서 만든 Quill 컴포넌트 경로
  {
    loading: () => <Spinner />, // 로딩 중에 표시할 컴포넌트
    ssr: false, // **이 부분이 서버 렌더링을 막아주는 핵심입니다.**
  },
);
const DynamicEndingInput = dynamic(
  () => import('./components/inputs/EndingInput'), // 1단계에서 만든 Quill 컴포넌트 경로
  {
    loading: () => <Spinner />, // 로딩 중에 표시할 컴포넌트
    ssr: false, // **이 부분이 서버 렌더링을 막아주는 핵심입니다.**
  },
);

function InvitationEditor() {
  const { invitationDetail } = useInvitationDetail();
  const bgColor = useAtomValue(invitationEditorAtom.selectedBgColor);
  const isSaving = useAtomValue(invitationEditorAtom.isSaving);
  if (!invitationDetail) return null;
  return (
    <Flex gapX={[4, 8]} mt={8} h="full">
      {isSaving && (
        <Box
          position="fixed"
          bottom={4}
          right={4}
          zIndex={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex alignItems="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm">Saving</Text>
          </Flex>
        </Box>
      )}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        w={`calc(100% - 480px)`}
        h="full"
        pb={32}
      >
        <Accordion.Root
          multiple
          defaultValue={[
            'theme',
            'date',
            'place',
            'personal',
            'main',
            'dressCode',
            'greeting',
            'photo',
            'music',
            'sponsor',
            'entourage',
            'order',
            'notice',
          ]}
        >
          <Stack spaceY={4}>
            <ThemeInput
              invitationId={invitationDetail.uniqueId}
              bgColor={invitationDetail.bgColor}
              pointColor={invitationDetail.pointColor}
            ></ThemeInput>
            <DateInput date={invitationDetail.date}></DateInput>
            <PlaceInput placeList={invitationDetail.placeList}></PlaceInput>
            <PersonalInput
              brideLastName={invitationDetail.brideLastName}
              brideFirstName={invitationDetail.brideFirstName}
              brideMiddleName={invitationDetail.brideMiddleName}
              brideMomName={invitationDetail.brideMomName}
              brideDadName={invitationDetail.brideDadName}
              groomLastName={invitationDetail.groomLastName}
              groomFirstName={invitationDetail.groomFirstName}
              groomMiddleName={invitationDetail.groomMiddleName}
              groomMomName={invitationDetail.groomMomName}
              groomDadName={invitationDetail.groomDadName}
            ></PersonalInput>
            <TemplateInput
              templateNo={invitationDetail.templateNo}
              mainPhoto={
                invitationDetail.invitationCoverPhotoList
                  ? invitationDetail.invitationCoverPhotoList.find(
                      (photo) => photo.type === 'main',
                    )
                  : null
              }
              textColor={invitationDetail.mainTextColor}
            ></TemplateInput>
            <DynamicGreetingInput></DynamicGreetingInput>
            <DressCodeInput></DressCodeInput>
            {/* <OpeningInput></OpeningInput> */}
            <PhotoInput photoList={invitationDetail.photoList}></PhotoInput>
            <SponsorInput
              primary={invitationDetail?.primarySponsor}
              secondary={invitationDetail?.secondarySponsor}
            ></SponsorInput>
            <EntourageInput
              bestMan={invitationDetail.bestMan}
              maidOfHonor={invitationDetail.maidOfHonor}
              groomsMen={invitationDetail.groomsMen}
              bridesMaids={invitationDetail.bridesMaids}
            ></EntourageInput>
            <OrderInput layoutOrder={invitationDetail.layoutOrder}></OrderInput>
            <MusicInput
              musicKey={invitationDetail.musicKey}
              musicFileKey={invitationDetail.musicFileKey}
              musicFilename={invitationDetail.musicFilename}
            ></MusicInput>
            <DynamicNoticeInput
              notice={invitationDetail.notice}
            ></DynamicNoticeInput>
            <DynamicEndingInput
              text={invitationDetail?.endingText || ''}
              endPhoto={invitationDetail.invitationCoverPhotoList.find(
                (photo) => photo.type === 'end',
              )}
            ></DynamicEndingInput>
          </Stack>
        </Accordion.Root>
      </Flex>
      <Flex
        position="sticky"
        overflowY="auto"
        bg={bgColor || ''}
        className="hideScrollbar"
        borderTopRadius="3xl"
        top={`${layoutConstants.headerHeight + 32}px`}
        justifyContent="center"
        w="480px"
        pb={16}
        h={`calc(100vh - ${layoutConstants.headerHeight + 64}px) `}
      >
        <Box borderRadius="sm" w="full">
          <PreviewInvitation></PreviewInvitation>
        </Box>
      </Flex>
    </Flex>
  );
}

export default InvitationEditor;
