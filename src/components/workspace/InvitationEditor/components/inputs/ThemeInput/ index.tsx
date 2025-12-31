import { Accordion, Circle, DataList, Flex, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { bgColorConfig, pointColorConfig } from '@/configs/theme.config';
import { saved } from '@/helpers/toaster.helper';
import { updateColorApi } from '@/hooks/invitation/api';

function ThemeInput({
  invitationId,
  bgColor,
  pointColor,
}: {
  invitationId: string;
  bgColor: string | null;
  pointColor: string | null;
}) {
  const [bColor, setBcolor] = useAtom(invitationEditorAtom.selectedBgColor);
  const [pColor, setPcolor] = useAtom(invitationEditorAtom.selectedPointColor);

  useEffect(() => {
    if (!bgColor || !pointColor) return;
    setBcolor(bgColor);
    setPcolor(pointColor);
  }, [bgColor, pointColor]);

  const handleClickBgColor = async (color: string) => {
    setBcolor(color);
    saved(() => updateColorApi(invitationId, 'bgColor', color));
  };

  const handleClickPointColor = async (color: string) => {
    setPcolor(color);
    saved(() => updateColorApi(invitationId, 'pointColor', color));
  };

  return (
    <Accordion.Item
      value="theme"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger borderBottomWidth={1}>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Theme</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex w="full" mb={4} direction="column" gap={4}>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Background Color</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Flex gap={2}>
                    {bgColorConfig.map((c) => {
                      const isActive = c === bColor;
                      return (
                        <Circle
                          role="button"
                          key={`bg-color-${c}`}
                          w="32px"
                          h="32px"
                          bg={c}
                          borderWidth={2}
                          cursor="pointer"
                          borderColor={isActive ? 'black' : 'transparent'}
                          onClick={() => handleClickBgColor(c)}
                        ></Circle>
                      );
                    })}
                  </Flex>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Accent Color</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Flex gap={2}>
                    {pointColorConfig.map((c) => {
                      const isActive = c === pColor;
                      return (
                        <Circle
                          key={`accent-color-${c}`}
                          w="32px"
                          role="button"
                          h="32px"
                          bg={c}
                          cursor="pointer"
                          borderWidth={2}
                          borderColor={isActive ? 'black' : 'transparent'}
                          onClick={() => handleClickPointColor(c)}
                        ></Circle>
                      );
                    })}
                  </Flex>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default ThemeInput;
