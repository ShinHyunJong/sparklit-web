import { Accordion, Flex, Icon, Text } from '@chakra-ui/react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from '@hello-pangea/dnd';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { RiDraggable } from 'react-icons/ri';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { COMPONENT_MAP } from '@/configs/LayoutComponent';
import { saved } from '@/helpers/toaster.helper';
import { updateLayoutOrderApi } from '@/hooks/invitation/api';
import type { LayoutItem } from '@/types/client.model';

function OrderInput({ layoutOrder }: { layoutOrder: string | null }) {
  const [layoutSettings, setLayoutSettings] = useAtom(
    invitationEditorAtom.layoutOrderAtom,
  );
  const searchParams = useSearchParams();
  const invitationUid = searchParams.get('uid') || '';

  useEffect(() => {
    if (!layoutOrder) return;
    const orderArray = JSON.parse(layoutOrder) as LayoutItem[];
    const existingIds = orderArray.map((item) => item.id);
    const missingKeys = Object.keys(COMPONENT_MAP).filter(
      (key) => !existingIds.includes(key),
    );
    console.log(missingKeys);
    const merged = [
      ...orderArray,
      ...missingKeys.map((key) => ({ id: key, visible: true })),
    ];
    setLayoutSettings(merged);
  }, [layoutOrder]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const newList = Array.from(layoutSettings);
    const [movedItem] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, movedItem);
    setLayoutSettings(newList);
    saved(() => updateLayoutOrderApi(invitationUid, JSON.stringify(newList)));
  };

  return (
    <Accordion.Item
      value="order"
      bg="white"
      borderRadius="sm"
      borderBottomWidth={0}
    >
      <Accordion.ItemTrigger>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Order</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={4}>
          <Flex direction="column" gap={4}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="photo-list" direction="vertical">
                {(provided) => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    direction="column"
                    gap={2}
                  >
                    {layoutSettings.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <Flex
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Flex
                              key={item.id}
                              align="center"
                              justify="space-between"
                              p={2}
                              borderWidth={1}
                              borderRadius="md"
                              alignItems="center"
                              w="full"
                            >
                              <Flex gap={1} alignItems="center">
                                <Icon>
                                  <RiDraggable></RiDraggable>
                                </Icon>
                                <Text>{item.id}</Text>
                              </Flex>
                              {/* <Text>{item.visible ? 'Visible' : 'Hidden'}</Text> */}
                            </Flex>
                          </Flex>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Flex>
                )}
              </Droppable>
            </DragDropContext>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default OrderInput;
