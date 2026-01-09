import {
  Accordion,
  Box,
  DataList,
  Flex,
  Input,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useInvitationDetail } from '@/hooks/invitation';
import { useUpdateGreeting } from '@/hooks/invitation/greeting';

type GreetingForm = {
  title: string;
};

function GreetingInput() {
  const { invitationDetail } = useInvitationDetail();
  const { updateGreeting } = useUpdateGreeting();
  const [greetingTitle, setGreetingTitle] = useAtom(
    invitationEditorAtom.greetingTitle,
  );
  const [greetingContent, setGreetingContent] = useAtom(
    invitationEditorAtom.greetingContent,
  );

  const { register, setValue } = useForm<GreetingForm>({
    defaultValues: { title: greetingTitle },
  });
  const dataListOrientation =
    useBreakpointValue({ base: 'vertical', md: 'horizontal' }) ?? 'horizontal';

  useEffect(() => {
    if (invitationDetail?.greetingTitle) {
      setGreetingTitle(invitationDetail.greetingTitle);
      setValue('title', invitationDetail.greetingTitle);
    }
    if (invitationDetail?.greetingContent) {
      setGreetingContent(invitationDetail.greetingContent);
    }
  }, [invitationDetail]);

  // 1. 툴바에 표시할 항목 정의 및 컬러 모듈 활성화
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 제목 크기
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 기본 포맷
      // 🚨 이 부분이 중요합니다: 텍스트 색상 및 배경 색상 선택기를 툴바에 추가
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
    setGreetingContent(content);
  };

  return (
    <Accordion.Item
      value="greeting"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={{ base: 3, md: 4 }} w="full">
          <Text>Greeting</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Flex w="full" mb={{ base: 3, md: 4 }} direction="column" gap={4}>
            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Title</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Input
                    {...register('title')}
                    value={greetingTitle}
                    variant="subtle"
                    onChange={(e) => setGreetingTitle(e.target.value)}
                    onBlur={updateGreeting}
                    size="sm"
                    w="full"
                  ></Input>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root orientation={dataListOrientation}>
              <DataList.Item>
                <DataList.ItemLabel>Content</DataList.ItemLabel>
                <DataList.ItemValue w="full">
                  <Box w="full">
                    <ReactQuill
                      value={greetingContent}
                      onChange={onChange}
                      modules={modules}
                      formats={formats}
                      onBlur={updateGreeting}
                      // theme="snow"
                      // modules={modules}
                    ></ReactQuill>
                  </Box>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default GreetingInput;
