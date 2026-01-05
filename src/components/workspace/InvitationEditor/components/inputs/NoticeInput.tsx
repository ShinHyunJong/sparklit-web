import { Accordion, Flex, Switch, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import { updateLayoutOrderApi, updateNoticeApi } from '@/hooks/invitation/api';

type NoticeForm = {
  content: string;
};

function NoticeInput({ notice }: { notice: string | null }) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  // 레이아웃 순서 및 가시성 상태 atom
  const [layoutSettings, setLayoutSettings] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );

  const [noticeContent, setNotice] = useAtom(invitationEditorAtom.notice);

  // 현재 'notice' 항목의 가시성 상태 찾기 (ID 소문자 유지)
  const noticeLayout = layoutSettings.find((item) => item.id === 'Notice');
  const isVisible = noticeLayout?.visible ?? true;

  const { setValue } = useForm<NoticeForm>({
    defaultValues: { content: noticeContent },
  });

  useEffect(() => {
    if (notice) {
      setNotice(notice);
      setValue('content', notice);
    }
  }, [notice, setNotice, setValue]);

  // 가시성 토글 핸들러
  const handleToggleVisible = (details: { checked: boolean }) => {
    const nextLayout = layoutSettings.map((item) =>
      item.id === 'Notice' ? { ...item, visible: details.checked } : item,
    );

    setLayoutSettings(nextLayout);
    // 변경된 레이아웃 설정을 DB에 저장
    saved(() => updateLayoutOrderApi(invitationId, JSON.stringify(nextLayout)));
  };

  const handleBlur = async () => {
    saved(() => updateNoticeApi(invitationId, noticeContent));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'align',
    'background',
  ];

  return (
    <Accordion.Item
      value="notice"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
      opacity={isVisible ? 1 : 0.6}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full" align="center" gap={3}>
          {/* 가시성 토글 스위치 */}
          <Switch.Root
            colorScheme="teal"
            checked={isVisible}
            onCheckedChange={handleToggleVisible}
            onClick={(e) => e.stopPropagation()}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Root>
          <Text fontWeight={isVisible ? 'bold' : 'normal'}>Notice</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>

      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <ReactQuill
              value={noticeContent}
              onChange={(content) => setNotice(content)}
              modules={modules}
              formats={formats}
              onBlur={handleBlur}
            />
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default NoticeInput;
