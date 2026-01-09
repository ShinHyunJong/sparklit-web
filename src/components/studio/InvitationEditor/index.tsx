'use client';

import {
  Accordion,
  Box,
  Button,
  Center,
  CloseButton,
  Dialog,
  Flex,
  HStack,
  Icon,
  IconButton,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { FaEye, FaFacebook, FaFacebookMessenger } from 'react-icons/fa6';
import { LuArrowLeft, LuLink, LuWifi } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { toaster } from '@/components/ui/toaster';
import { layoutConstants } from '@/constants/layout';
import { triggerInvitationRevalidate } from '@/lib/revalidateInvitation';
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
  const router = useRouter();
  const pathname = usePathname();
  const isCreatePage = pathname === '/studio/create';

  const currentUrl = useMemo(
    () => `https://sparklit.co/invitation/${uid}`,
    [uid],
  );
  const revalidateInvite = () => triggerInvitationRevalidate(uid);

  const bgColor = useAtomValue(invitationEditorAtom.selectedBgColor);
  const selectedFontFamily = useAtomValue(
    invitationEditorAtom.selectedFontFamily,
  );
  const isSaving = useAtomValue(invitationEditorAtom.isSaving);

  // ✅ 모바일 Fullscreen Preview Dialog open state
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      void revalidateInvite();
      toaster.create({ title: 'Link copied to clipboard.', type: 'success' });
    } catch {
      toaster.create({ title: 'Failed to copy link.', type: 'error' });
    }
  };

  const handleOpenPreview = () => {
    void revalidateInvite();
    window.open(currentUrl, '_blank');
  };

  const handleShareFacebook = () => {
    void revalidateInvite();
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`;
    window.open(
      facebookShareUrl,
      'facebook-share-dialog',
      'width=800,height=600',
    );
  };

  const handleShareMessenger = () => {
    void revalidateInvite();
    const messengerUrl = `https://www.facebook.com/dialog/send?app_id=1654128312237206&link=${encodeURIComponent(
      currentUrl,
    )}&redirect_uri=${encodeURIComponent('https://sparklit.co')}&v=${Date.now()}`;

    if (/iPhone|Android/i.test(navigator.userAgent)) {
      window.location.href = `fb-messenger://share?link=${encodeURIComponent(
        currentUrl,
      )}`;
    } else {
      window.open(
        messengerUrl,
        'messenger-share-dialog',
        'width=800,height=600',
      );
    }
  };

  if (isLoading || !invitationDetail) {
    return (
      <Center h="80vh">
        <Spinner />
      </Center>
    );
  }

  const previewBg = bgColor || 'white';

  return (
    <Flex gapX={[4, 8]} mt={8} h="full" position="relative">
      {/* 저장 중 표시 알림 */}
      {isSaving && (
        <Box
          position="fixed"
          bottom={4}
          right={4}
          zIndex={50}
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
        w={{ base: '100%', md: `calc(100% - 480px)` }}
        h="full"
        pb={{ base: 28, md: 32 }} // ✅ 모바일 하단 고정 버튼 높이만큼 여백
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
          <Stack spaceY={4} w="full">
            {isCreatePage && (
              <Flex>
                <IconButton
                  aria-label="Go back"
                  onClick={() => router.push('/studio')}
                  variant="outline"
                  rounded="full"
                  size="sm"
                >
                  <Icon>
                    <LuArrowLeft />
                  </Icon>
                </IconButton>
              </Flex>
            )}
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

      {/* ✅ 데스크탑 오른쪽 프리뷰 영역 */}
      <Flex
        display={{ base: 'none', md: 'flex' }}
        position="sticky"
        top={`${layoutConstants.headerHeight + 32}px`}
        w="480px"
        h={`calc(100vh - ${layoutConstants.headerHeight + 64}px)`}
        flexDirection="column"
        overflow="hidden"
        backgroundColor={previewBg}
        borderTopRadius="3xl"
        boxShadow="xl"
      >
        <HStack
          position="sticky"
          top={0}
          zIndex={10}
          w="full"
          p={4}
          justifyContent="space-between"
          bg={previewBg}
          borderTopRadius="3xl"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Icon>
            <LuWifi />
          </Icon>

          <HStack gap={2}>
            <IconButton
              aria-label="Open preview in new tab"
              onClick={handleOpenPreview}
              size="sm"
              variant="subtle"
              rounded="full"
              colorPalette="gray"
            >
              <FaEye />
            </IconButton>

            <IconButton
              aria-label="Copy invitation link"
              onClick={handleCopyLink}
              size="sm"
              variant="outline"
              rounded="full"
              colorPalette="gray"
            >
              <LuLink />
            </IconButton>

            <IconButton
              aria-label="Share on Facebook"
              onClick={handleShareFacebook}
              size="sm"
              colorPalette="blue"
              rounded="full"
            >
              <FaFacebook />
            </IconButton>

            <IconButton
              aria-label="Share on Messenger"
              onClick={handleShareMessenger}
              size="sm"
              variant="subtle"
              rounded="full"
              colorPalette="blue"
            >
              <FaFacebookMessenger />
            </IconButton>
          </HStack>
        </HStack>

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

      {/* ✅ 모바일 하단 고정 미리보기 버튼 */}
      <Box
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        left={0}
        right={0}
        bottom={0}
        zIndex={60}
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        px={3}
        py={1.5}
        pb="max(6px, env(safe-area-inset-bottom))"
      >
        <HStack gap={3}>
          <Button
            w="full"
            size="sm"
            borderRadius="xl"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
        </HStack>
      </Box>

      {/* ✅ 모바일 Fullscreen Dialog */}
      <Dialog.Root
        lazyMount
        open={previewOpen}
        size="full"
        onOpenChange={(e) => setPreviewOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" />
          <Dialog.Positioner style={{ padding: 0 }}>
            <Dialog.Content
              w="100vw"
              h="100vh"
              maxW="100vw"
              maxH="100vh"
              borderRadius="0"
              overflow="hidden"
              bg="white"
            >
              {/* ✅ CloseButton을 헤더 왼쪽에, 아이콘은 오른쪽 (space-between) */}
              <Dialog.Header p={0}>
                <HStack
                  w="full"
                  p={4}
                  justifyContent="space-between"
                  alignItems="center"
                  bg={previewBg}
                  borderBottom="1px solid"
                  borderColor="gray.100"
                >
                  {/* 왼쪽: Close */}
                  <CloseButton
                    size="sm"
                    onClick={() => setPreviewOpen(false)}
                  />

                  {/* 오른쪽: 액션 아이콘들 */}
                  <HStack gap={2}>
                    <IconButton
                      aria-label="Open preview in new tab"
                      onClick={handleOpenPreview}
                      size="sm"
                      variant="subtle"
                      rounded="full"
                      colorPalette="gray"
                    >
                      <FaEye />
                    </IconButton>

                    <IconButton
                      aria-label="Copy invitation link"
                      onClick={handleCopyLink}
                      size="sm"
                      variant="outline"
                      rounded="full"
                      colorPalette="gray"
                    >
                      <LuLink />
                    </IconButton>

                    <IconButton
                      aria-label="Share on Facebook"
                      onClick={handleShareFacebook}
                      size="sm"
                      colorPalette="blue"
                      rounded="full"
                    >
                      <FaFacebook />
                    </IconButton>

                    <IconButton
                      aria-label="Share on Messenger"
                      onClick={handleShareMessenger}
                      size="sm"
                      variant="subtle"
                      rounded="full"
                      colorPalette="blue"
                    >
                      <FaFacebookMessenger />
                    </IconButton>
                  </HStack>
                </HStack>
              </Dialog.Header>
              <Dialog.Body p={0}>
                <Box
                  h="calc(100vh - 72px)" // 헤더 높이 대략값
                  overflowY="auto"
                  className="hideScrollbar"
                  fontFamily={selectedFontFamily}
                  w="full"
                  bg={previewBg}
                >
                  <PreviewInvitation />
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Flex>
  );
}

export default InvitationEditor;
