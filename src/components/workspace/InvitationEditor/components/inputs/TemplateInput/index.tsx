import type { Color } from '@chakra-ui/react';
import {
  Accordion,
  Box,
  ColorPicker,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  parseColor,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { S3_BUCKET_URL } from '@/configs/domain.config';
import { templateConfig } from '@/configs/template.config';
import { saved } from '@/helpers/toaster.helper';
import { updateColorApi, updateTemplateNoApi } from '@/hooks/invitation/api';
import { useMainUpload } from '@/hooks/upload/main';
import type { InvitationCoverPhoto } from '@/types/model';

const templateMainTextList = [4];

function TemplateInput({
  templateNo,
  mainPhoto,
  textColor,
}: {
  templateNo: number;
  mainPhoto: InvitationCoverPhoto | null | undefined;
  textColor: string | null;
}) {
  const uid = useSearchParams().get('uid') || '';
  const [selectedTemplateNo, setTemplateNo] = useAtom(
    invitationEditorAtom.selectedTemplateNo,
  );
  const [mainTextColor, setMainTextColor] = useAtom(
    invitationEditorAtom.selectedMainColor,
  );

  const { processFileList, isProcessing, isPostingPending } = useMainUpload();
  useEffect(() => {
    if (!templateNo || !textColor) return;
    setTemplateNo(templateNo);
    setMainTextColor(parseColor(textColor));
  }, [templateNo, textColor]);

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

  const handleTemplateClick = async (id: number) => {
    setTemplateNo(id);
    // await updateTemplateNoApi(uid, id);
    saved(() => updateTemplateNoApi(uid, id));
  };

  const onColorChangeEnd = async (color: Color) => {
    if (!color) return;
    await updateColorApi(uid, 'mainTextColor', color.toString('hex'));
  };

  const exist = !!mainPhoto;
  const showMainTextColorPicker =
    templateMainTextList.includes(selectedTemplateNo);

  return (
    <Accordion.Item
      value="main"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={{ base: 3, md: 4 }} w="full">
          <Text>Main Photo & Template</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Flex w="full" mb={{ base: 3, md: 4 }} direction="column" gap={4}>
            <Flex gap={2} overflowX="auto" w="full">
              {templateConfig.map((t) => {
                return (
                  <Box
                    w="120px"
                    borderWidth={1}
                    role="button"
                    cursor="pointer"
                    borderRadius="md"
                    onClick={() => handleTemplateClick(t.id)}
                    borderColor={
                      t.id == selectedTemplateNo ? 'gray.800' : 'gray.100'
                    }
                    key={`tempelete-preview-${t.id}`}
                    aspectRatio={4 / 5}
                  >
                    <Image
                      w="full"
                      h="auto"
                      borderRadius="md"
                      src={t.previewUrl}
                      alt={`Template ${t.id}`}
                    />
                  </Box>
                );
              })}
            </Flex>
            <Flex direction="column" mt={{ base: 4, md: 8 }}>
              <Text fontSize="sm" mb={2} color="gray.600">
                Main Photo
              </Text>
              <Flex gap={{ base: 4, md: 8 }} direction={{ base: 'column', md: 'row' }}>
                {mainPhoto && (
                  <Box w={{ base: 'full', md: '25%' }}>
                    <Image
                      alt="mainImage"
                      w="full"
                      h="auto"
                      src={
                        `${S3_BUCKET_URL}${mainPhoto?.croppedKey || ''}` || ''
                      }
                    ></Image>
                  </Box>
                )}

                <Input
                  id="main-photo-upload"
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
                  htmlFor="main-photo-upload"
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
              {showMainTextColorPicker && (
                <Flex mt={4}>
                  <ColorPicker.Root
                    value={mainTextColor || ''}
                    onValueChange={(e) => setMainTextColor(e.value)}
                    onValueChangeEnd={(e) => onColorChangeEnd(e.value)}
                  >
                    <ColorPicker.HiddenInput />
                    <ColorPicker.Label>Font Color</ColorPicker.Label>
                    <ColorPicker.Control>
                      <ColorPicker.Input />
                      <ColorPicker.Trigger />
                    </ColorPicker.Control>
                    <Portal>
                      <ColorPicker.Positioner>
                        <ColorPicker.Content>
                          <ColorPicker.Area />
                          <HStack>
                            <ColorPicker.EyeDropper
                              size="xs"
                              variant="outline"
                            />
                            <ColorPicker.Sliders />
                          </HStack>
                        </ColorPicker.Content>
                      </ColorPicker.Positioner>
                    </Portal>
                  </ColorPicker.Root>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default TemplateInput;
