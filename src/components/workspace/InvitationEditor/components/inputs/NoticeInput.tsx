import { Accordion, Flex, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import { updateNoticeApi } from '@/hooks/invitation/api';

type NoticeForm = {
  content: string;
};

function NoticeInput({ notice }: { notice: string | null }) {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';

  const [noticeContent, setNotice] = useAtom(invitationEditorAtom.notice);

  const { setValue } = useForm<NoticeForm>({
    defaultValues: { content: noticeContent },
  });

  useEffect(() => {
    if (notice) {
      setNotice(notice);
      setValue('content', notice);
    }
  }, [notice]);

  const handleBlur = async () => {
    saved(() => updateNoticeApi(invitationId, noticeContent));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 제목 크기
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 기본 포맷
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  // 2. 에디터가 처리할 수 있는 포맷 목록 정의 (필수)
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

  const onChange = (content: string, delta: any, source: any, editor: any) => {
    setNotice(content);
  };

  return (
    <Accordion.Item
      value="notice"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Notice</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <ReactQuill
              value={noticeContent}
              onChange={onChange}
              modules={modules}
              formats={formats}
              onBlur={handleBlur}
              // theme="snow"
              // modules={modules}
            ></ReactQuill>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default NoticeInput;
