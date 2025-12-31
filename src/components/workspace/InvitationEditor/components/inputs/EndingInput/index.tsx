import {
  Accordion,
  Box,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import ReactQuill from 'react-quill-new';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { saved } from '@/helpers/toaster.helper';
import { updateEndingTextApi } from '@/hooks/invitation/api';
import { useEndUpload } from '@/hooks/upload/end';
import type { InvitationCoverPhoto } from '@/types/model';

function EndingInput({
  text,
  endPhoto,
}: {
  text: string;
  endPhoto: InvitationCoverPhoto | null | undefined;
}) {
  const uid = useSearchParams().get('uid') || '';
  const [endingText, setEndingText] = useAtom(invitationEditorAtom.endingText);

  const { processFileList, isProcessing, isPostingPending } = useEndUpload();

  useEffect(() => {
    if (!text) return;
    setEndingText(text);
  }, [text]);

  const handleFile = async (e: any) => {
    try {
      const { files } = e.target;
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      const result = await processFileList(file);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const onChange = (content: string, delta: any, source: any, editor: any) => {
    setEndingText(content);
  };

  const exist = !!endPhoto;

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 제목 크기
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 기본 포맷
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  const handleBlur = async () => {
    saved(() => updateEndingTextApi(uid, endingText));
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

  return (
    <Accordion.Item
      value="ending"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Ending</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <Flex direction="column">
              <Flex gap={8}>
                {endPhoto && (
                  <Box w="25%">
                    <Image
                      alt="endImage"
                      w="full"
                      h="auto"
                      src={
                        `${S3_BUCKET_URL}${endPhoto?.croppedKey || ''}` || ''
                      }
                    ></Image>
                  </Box>
                )}

                <Input
                  id="end-photo-upload"
                  display="none"
                  onChange={handleFile}
                  type="file"
                  accept="image/*"
                />
                <label
                  style={{
                    cursor: 'pointer',
                    gap: 2,
                  }}
                  htmlFor="end-photo-upload"
                >
                  <Flex
                    gap={2}
                    aspectRatio={1}
                    w="100px"
                    h="100px"
                    borderColor="gray.300"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={1}
                    direction="column"
                    borderRadius="sm"
                  >
                    {isProcessing || isPostingPending ? (
                      <Spinner />
                    ) : (
                      <>
                        <Icon>{exist ? <FaExchangeAlt /> : <FaPlus />}</Icon>
                        <Flex
                          fontSize="xs"
                          justifyContent="center"
                          direction="column"
                          textAlign="center"
                        >
                          <Text>{exist ? 'Change' : 'Select'}</Text>
                          <Text>Photo</Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                </label>
              </Flex>
            </Flex>
            <Flex w="full" mb={4} direction="column" gap={4}>
              <ReactQuill
                value={endingText}
                onChange={onChange}
                modules={modules}
                formats={formats}
                onBlur={handleBlur}
                // theme="snow"
                // modules={modules}
              ></ReactQuill>
            </Flex>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default EndingInput;
