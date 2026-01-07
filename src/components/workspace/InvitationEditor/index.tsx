'use client';

import {
  Accordion,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { FaFacebook, FaFacebookMessenger } from 'react-icons/fa6';
import { LuWifi } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { layoutConstants } from '@/constants/layout';
import { useInvitationDetail } from '@/hooks/invitation';

import DateInput from './components/inputs/DateInput';
import DressCodeInput from './components/inputs/DressCodeInput';
import EntourageInput from './components/inputs/EntourageInput';
import MonetaryInput from './components/inputs/MonetaryInput';
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
  () => import('./components/inputs/GreetingInput'),
  { loading: () => <Spinner />, ssr: false },
);
const DynamicNoticeInput = dynamic(
  () => import('./components/inputs/NoticeInput'),
  { loading: () => <Spinner />, ssr: false },
);
const DynamicEndingInput = dynamic(
  () => import('./components/inputs/EndingInput'),
  { loading: () => <Spinner />, ssr: false },
);

function InvitationEditor() {
  const { invitationDetail, isLoading } = useInvitationDetail();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid') || '';
  const currentUrl = `https://sparklit.co/invitation/${uid}`;
  const bgColor = useAtomValue(invitationEditorAtom.selectedBgColor);
  const selectedFontFamily = useAtomValue(
    invitationEditorAtom.selectedFontFamily,
  );
  const isSaving = useAtomValue(invitationEditorAtom.isSaving);

  const handleShareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(
      facebookShareUrl,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  };

  const handleShareMessenger = () => {
    // 앱 ID가 있다면 다이렉트 메시지 전송창을 띄울 수 있습니다.
    // 단순히 공유 목적이라면 아래 URL을 사용합니다.
    const messengerUrl = `https://www.facebook.com/dialog/send?app_id=1654128312237206&link=${encodeURIComponent(currentUrl)}&redirect_uri=${encodeURIComponent(currentUrl)}`;
    console.log(currentUrl);
    if (/iPhone|Android/i.test(navigator.userAgent)) {
      window.location.href = `fb-messenger://share?link=${encodeURIComponent(currentUrl)}`;
    } else {
      window.open(
        messengerUrl,
        'messenger-share-dialog',
        'width=800,height=600',
      );
    }
  };

  if (isLoading || !invitationDetail)
    return (
      <Center h="80vh">
        <Spinner />
      </Center>
    );

  return (
    <Flex gapX={[4, 8]} mt={8} h="full">
      {/* 저장 중 표시 알림 */}
      {isSaving && (
        <Box
          position="fixed"
          bottom={4}
          right={4}
          zIndex={20}
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="md"
        >
          <Flex alignItems="center" gap={2}>
            <Spinner size="sm" />
            <Text fontSize="sm">Saving...</Text>
          </Flex>
        </Box>
      )}

      {/* 왼쪽 입력 폼 영역 */}
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
            'monetary',
            'ending',
          ]}
        >
          <Stack spaceY={4}>
            <ThemeInput
              invitationId={invitationDetail.uniqueId}
              bgColor={invitationDetail.bgColor}
              pointColor={invitationDetail.pointColor}
              fontFamily={invitationDetail.baseFont}
            />
            <DateInput date={invitationDetail.date} />
            <PlaceInput placeList={invitationDetail.placeList} />
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
            />
            <TemplateInput
              templateNo={invitationDetail.templateNo}
              mainPhoto={invitationDetail.invitationCoverPhotoList?.find(
                (photo) => photo.type === 'main',
              )}
              textColor={invitationDetail.mainTextColor}
            />
            <DynamicGreetingInput />
            <DressCodeInput />
            <PhotoInput photoList={invitationDetail.photoList} />
            <SponsorInput
              primary={invitationDetail?.primarySponsor}
              secondary={invitationDetail?.secondarySponsor}
            />
            <EntourageInput
              bestMan={invitationDetail.bestMan}
              maidOfHonor={invitationDetail.maidOfHonor}
              groomsMen={invitationDetail.groomsMen}
              bridesMaids={invitationDetail.bridesMaids}
            />
            <DynamicNoticeInput notice={invitationDetail.notice} />
            <MonetaryInput
              initialBankAccount={invitationDetail.bankAccount || ''}
              initialWishlistUrl={invitationDetail.wishlistUrl || ''}
            />
            <OrderInput layoutOrder={invitationDetail.layoutOrder} />
            <DynamicEndingInput
              text={invitationDetail?.endingText || ''}
              endPhoto={invitationDetail.invitationCoverPhotoList?.find(
                (photo) => photo.type === 'end',
              )}
            />
            <MusicInput
              musicKey={invitationDetail.musicKey}
              musicFileKey={invitationDetail.musicFileKey}
              musicFilename={invitationDetail.musicFilename}
            />
          </Stack>
        </Accordion.Root>
      </Flex>

      {/* 오른쪽 프리뷰 영역 (고정 사이드바) */}
      <Flex
        position="sticky"
        top={`${layoutConstants.headerHeight + 32}px`}
        w="480px"
        h={`calc(100vh - ${layoutConstants.headerHeight + 64}px) `}
        flexDirection="column"
        overflow="hidden" // 내부 개별 스크롤을 위해
        backgroundColor={bgColor || 'white'}
        borderTopRadius="3xl"
        boxShadow="xl"
      >
        {/* 상단 고정 버튼 바 */}
        <HStack
          position="sticky"
          top={0}
          zIndex={10}
          w="full"
          p={4}
          justifyContent="space-between"
          bg={bgColor || 'white'}
          borderTopRadius="3xl"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Icon>
            <LuWifi></LuWifi>
          </Icon>
          <HStack gap={2}>
            <Button size="sm" variant="outline" colorScheme="gray">
              전체 미리보기
            </Button>
            <IconButton
              onClick={handleShareFacebook}
              size="sm"
              colorScheme="blackAlpha"
            >
              <FaFacebook></FaFacebook>
            </IconButton>
            <IconButton
              onClick={handleShareMessenger}
              size="sm"
              colorScheme="blackAlpha"
            >
              <FaFacebookMessenger></FaFacebookMessenger>
            </IconButton>
          </HStack>
        </HStack>

        {/* 스크롤 가능한 프리뷰 내용 */}
        <Box
          flex={1}
          overflowY="auto"
          className="hideScrollbar"
          fontFamily={selectedFontFamily}
          borderRadius="sm"
          w="full"
        >
          <PreviewInvitation />
        </Box>
      </Flex>
    </Flex>
  );
}

export default InvitationEditor;
