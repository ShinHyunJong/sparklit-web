import type { Color } from '@chakra-ui/react';
import {
  Accordion,
  ColorPicker,
  DataList,
  Flex,
  GridItem,
  HStack,
  parseColor,
  Portal,
  SimpleGrid,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { saved } from '@/helpers/toaster.helper';
import { useInvitationDetail } from '@/hooks/invitation';
import {
  updateDressCodeApi,
  updateDressCodeColorApi,
} from '@/hooks/invitation/api';

type DressCodeForm = {
  gentleman: string;
  lady: string;
};

function DressCodeInput() {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get('uid') || '';
  const { invitationDetail } = useInvitationDetail();
  // const { updateGreeting } = useUpdateGreeting();
  const [dressCodeGentleman, setDressCodeGentleman] = useAtom(
    invitationEditorAtom.dressCodeGentleman,
  );
  const [dressCodeLady, setDressCodeLady] = useAtom(
    invitationEditorAtom.dressCodeLady,
  );
  const [mainColor, setMainColor] = useAtom(
    invitationEditorAtom.dressCodeMainColor,
  );
  const [subColor, setSubColor] = useAtom(
    invitationEditorAtom.dressCodeSubColor,
  );
  const [thirdColor, setThirdColor] = useAtom(
    invitationEditorAtom.dressCodeThirdColor,
  );

  const { register, handleSubmit, setValue } = useForm<DressCodeForm>({
    defaultValues: { gentleman: dressCodeGentleman, lady: dressCodeLady },
  });

  useEffect(() => {
    if (invitationDetail?.dressCodeGentleman) {
      setDressCodeGentleman(invitationDetail.dressCodeGentleman);
    }
    if (invitationDetail?.dressCodeLady) {
      setDressCodeLady(invitationDetail.dressCodeLady);
    }
    if (invitationDetail?.dressCodeMainColor) {
      setMainColor(parseColor(invitationDetail.dressCodeMainColor));
    }
    if (invitationDetail?.dressCodeSubColor) {
      setSubColor(parseColor(invitationDetail.dressCodeSubColor));
    }
    if (invitationDetail?.dressCodeThirdColor) {
      setThirdColor(parseColor(invitationDetail.dressCodeThirdColor));
    }
  }, [invitationDetail]);

  const onMainColorChangeEnd = async (color: Color) => {
    saved(() =>
      updateDressCodeColorApi(
        invitationId,
        color.toString('hex'),
        subColor.toString('hex'),
        thirdColor.toString('hex'),
      ),
    );
  };

  const onSubColorChangeEnd = async (color: Color) => {
    saved(() =>
      updateDressCodeColorApi(
        invitationId,
        mainColor.toString('hex'),
        color.toString('hex'),
        thirdColor.toString('hex'),
      ),
    );
  };

  const onThirdColorChangeEnd = async (color: Color) => {
    saved(() =>
      updateDressCodeColorApi(
        invitationId,
        mainColor.toString('hex'),
        subColor.toString('hex'),
        color.toString('hex'),
      ),
    );
  };

  const onBlurGentleman = async (value: string) => {
    saved(() => updateDressCodeApi(invitationId, value, dressCodeLady));
  };

  const onBlurLady = async (value: string) => {
    saved(() => updateDressCodeApi(invitationId, dressCodeGentleman, value));
  };

  return (
    <Accordion.Item
      value="dressCode"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Dress Code</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <SimpleGrid columns={3} gap={4}>
              <GridItem>
                <ColorPicker.Root
                  value={mainColor || ''}
                  onValueChange={(e) => setMainColor(e.value)}
                  onValueChangeEnd={(e) => onMainColorChangeEnd(e.value)}
                >
                  <ColorPicker.HiddenInput />
                  <ColorPicker.Label>Color 1</ColorPicker.Label>
                  <ColorPicker.Control>
                    <ColorPicker.Input />
                    <ColorPicker.Trigger />
                  </ColorPicker.Control>
                  <Portal>
                    <ColorPicker.Positioner>
                      <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                          <ColorPicker.EyeDropper size="xs" variant="outline" />
                          <ColorPicker.Sliders />
                        </HStack>
                      </ColorPicker.Content>
                    </ColorPicker.Positioner>
                  </Portal>
                </ColorPicker.Root>
              </GridItem>
              <GridItem>
                <ColorPicker.Root
                  value={subColor || ''}
                  onValueChange={(e) => setSubColor(e.value)}
                  onValueChangeEnd={(e) => onSubColorChangeEnd(e.value)}
                >
                  <ColorPicker.HiddenInput />
                  <ColorPicker.Label>Color 2</ColorPicker.Label>
                  <ColorPicker.Control>
                    <ColorPicker.Input />
                    <ColorPicker.Trigger />
                  </ColorPicker.Control>
                  <Portal>
                    <ColorPicker.Positioner>
                      <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                          <ColorPicker.EyeDropper size="xs" variant="outline" />
                          <ColorPicker.Sliders />
                        </HStack>
                      </ColorPicker.Content>
                    </ColorPicker.Positioner>
                  </Portal>
                </ColorPicker.Root>
              </GridItem>
              <GridItem>
                <ColorPicker.Root
                  value={thirdColor || ''}
                  onValueChange={(e) => setThirdColor(e.value)}
                  onValueChangeEnd={(e) => onThirdColorChangeEnd(e.value)}
                >
                  <ColorPicker.HiddenInput />
                  <ColorPicker.Label>Color 3</ColorPicker.Label>
                  <ColorPicker.Control>
                    <ColorPicker.Input />
                    <ColorPicker.Trigger />
                  </ColorPicker.Control>
                  <Portal>
                    <ColorPicker.Positioner>
                      <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                          <ColorPicker.EyeDropper size="xs" variant="outline" />
                          <ColorPicker.Sliders />
                        </HStack>
                      </ColorPicker.Content>
                    </ColorPicker.Positioner>
                  </Portal>
                </ColorPicker.Root>
              </GridItem>
            </SimpleGrid>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Gentlemen</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Textarea
                    {...register('gentleman')}
                    value={dressCodeGentleman}
                    variant="subtle"
                    onChange={(e) => setDressCodeGentleman(e.target.value)}
                    onBlur={(e) => onBlurGentleman(e.target.value)}
                    size="sm"
                  ></Textarea>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Ladies</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Textarea
                    {...register('lady')}
                    value={dressCodeLady}
                    variant="subtle"
                    onChange={(e) => setDressCodeLady(e.target.value)}
                    onBlur={(e) => onBlurLady(e.target.value)}
                    size="sm"
                  ></Textarea>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default DressCodeInput;
