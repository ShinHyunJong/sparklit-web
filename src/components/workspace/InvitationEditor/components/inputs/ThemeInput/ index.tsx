import {
  Accordion,
  Button,
  Circle,
  DataList,
  Flex,
  Menu, // Menu 네임스페이스 사용
  Portal,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { bgColorConfig, pointColorConfig } from '@/configs/theme.config';
import { saved } from '@/helpers/toaster.helper';
import { updateColorApi, updateFontApi } from '@/hooks/invitation/api';
import { fontOptions } from '@/styles';

function ThemeInput({
  invitationId,
  bgColor,
  pointColor,
  fontFamily,
}: {
  invitationId: string;
  bgColor: string | null;
  pointColor: string | null;
  fontFamily: string | null;
}) {
  const [bColor, setBcolor] = useAtom(invitationEditorAtom.selectedBgColor);
  const [pColor, setPcolor] = useAtom(invitationEditorAtom.selectedPointColor);
  const [selectedFont, setSelectedFont] = useAtom(
    invitationEditorAtom.selectedFontFamily,
  );

  useEffect(() => {
    if (bgColor) setBcolor(bgColor);
    if (pointColor) setPcolor(pointColor);
    if (fontFamily) setSelectedFont(fontFamily);
  }, [bgColor, pointColor, fontFamily]);

  const handleClickBgColor = async (color: string) => {
    setBcolor(color);
    saved(() => updateColorApi(invitationId, 'bgColor', color));
  };

  const handleClickPointColor = async (color: string) => {
    setPcolor(color);
    saved(() => updateColorApi(invitationId, 'pointColor', color));
  };

  const handleFontChange = async (fontValue: string) => {
    setSelectedFont(fontValue);
    saved(() => updateFontApi(invitationId, fontValue));
  };

  const currentFontLabel =
    fontOptions.find((f) => f.value === selectedFont)?.name || 'Select Font';
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
          <Flex w="full" mb={4} direction="column" gap={6}>
            {/* 1. Background Color */}
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Background</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Flex gap={2}>
                    {bgColorConfig.map((c) => (
                      <Circle
                        role="button"
                        key={`bg-color-${c.viewColor}`}
                        w="32px"
                        h="32px"
                        bg={c.viewColor}
                        borderWidth={2}
                        cursor="pointer"
                        borderColor={
                          c.originalColor === bColor ? 'black' : 'gray.100'
                        }
                        onClick={() => handleClickBgColor(c.originalColor)}
                      />
                    ))}
                  </Flex>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            {/* 2. Accent Color */}
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Accent</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Flex gap={2}>
                    {pointColorConfig.map((c) => (
                      <Circle
                        key={`accent-color-${c.viewColor}`}
                        w="32px"
                        h="32px"
                        role="button"
                        bg={c.viewColor}
                        cursor="pointer"
                        borderWidth={2}
                        borderColor={
                          c.originalColor === pColor ? 'black' : 'gray.100'
                        }
                        onClick={() => handleClickPointColor(c.originalColor)}
                      />
                    ))}
                  </Flex>
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>

            {/* 3. Font Selection - Portal 기반 구조 적용 */}
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Font Style</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        w="full"
                        justifyContent="space-between"
                      >
                        <Text fontFamily={selectedFont}>
                          {currentFontLabel}
                        </Text>
                        <LuChevronDown />
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          {fontOptions.map((font) => (
                            <Menu.Item
                              key={font.value}
                              value={font.value}
                              onClick={() => handleFontChange(font.value)}
                              cursor="pointer"
                              fontFamily={font.value}
                            >
                              {font.name}
                            </Menu.Item>
                          ))}
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
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
