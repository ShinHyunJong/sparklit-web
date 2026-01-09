import {
  Accordion,
  Button,
  Flex,
  Separator,
  Spinner,
  Text,
  Timeline,
} from '@chakra-ui/react';
import { useSetAtom } from 'jotai';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { usePostInvitationPlace } from '@/hooks/invitation/place';
import type { InvitationPlace } from '@/types/model';

import PlaceItem from './components/PlaceItem';
import PlaceSearch from './PlaceSearch';

function PlaceInput({ placeList }: { placeList: InvitationPlace[] }) {
  const { isPending, postPlace } = usePostInvitationPlace();

  const setInvitationPlaceDialogOpen = useSetAtom(
    invitationEditorAtom.placeDialogOpen,
  );
  return (
    <Accordion.Item
      borderBottomWidth={0}
      borderRadius={'sm'}
      value="place"
      bg="white"
    >
      <Accordion.ItemTrigger borderBottomWidth={1}>
        <Flex borderRadius="sm" p={{ base: 3, md: 4 }} w="full">
          <Text>Location & Time</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody p={{ base: 3, md: 4 }}>
          <Flex direction="column" gap={{ base: 3, md: 4 }}>
            <PlaceSearch postPlace={postPlace} />
            <Timeline.Root>
              {placeList.map((p, i) => {
                return (
                  <PlaceItem p={p} i={i} key={`place-${p.id}`}></PlaceItem>
                );
              })}
            </Timeline.Root>
            {isPending && (
              <Flex justifyContent="center">
                <Spinner></Spinner>
              </Flex>
            )}

            {/* <SimpleGrid columns={2} templateColumns="1fr 3fr" gap={4}>
            <GridItem>
              <Flex h="full" alignItems="center">
                <Text fontSize="sm" color="gray.500">
                  {t(`address`)}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
            </GridItem>
            <GridItem>
              <Flex h="full" alignItems="center">
                <Text fontSize="sm" color="gray.500">
                  {t(`time`)}
                </Text>
              </Flex>
            </GridItem>
          </SimpleGrid> */}
            <Separator my={{ base: 3, md: 4 }}></Separator>
            <Flex justifyContent="center">
              <Button onClick={() => setInvitationPlaceDialogOpen(true)}>
                Add Place
              </Button>
            </Flex>
          </Flex>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export default PlaceInput;
