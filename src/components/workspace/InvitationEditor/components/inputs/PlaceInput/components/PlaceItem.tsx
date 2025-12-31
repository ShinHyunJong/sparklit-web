import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  Timeline,
} from '@chakra-ui/react';
import { LuMapPin, LuPlus } from 'react-icons/lu';
import { PiTrashLight } from 'react-icons/pi';

import {
  useDeleteInvitationPlace,
  usePostInvitationPlaceTime,
} from '@/hooks/invitation/place';
import type { InvitationPlace } from '@/types/model';

import TimeInput from './TimeInput';

function PlaceItem({ p, i }: { p: InvitationPlace; i: number }) {
  const { isPending: isDeleting, deleteInvitationPlace } =
    useDeleteInvitationPlace();
  const { postTime, isPending } = usePostInvitationPlaceTime();

  return (
    <Timeline.Item key={`place-${p.id}`}>
      <Timeline.Connector>
        <Timeline.Separator />
        <Timeline.Indicator>
          <Circle bg="gray.800">{i + 1}</Circle>
        </Timeline.Indicator>
      </Timeline.Connector>
      <Timeline.Content>
        <Timeline.Title w="full" mb={2}>
          <Flex direction="row" borderRadius="md" gap={2} p={2} bg="gray.50">
            <Flex pt="1px">
              <Icon color="gray.600" boxSize="16px">
                <LuMapPin></LuMapPin>
              </Icon>
            </Flex>
            <Flex direction="column" borderRadius="sm">
              <Text fontWeight="bold">{p.place?.name}</Text>
              <Text>{p.place?.address}</Text>
            </Flex>
          </Flex>
          <Flex ml={2}>
            {isDeleting ? (
              <Spinner ml={2} size="sm" />
            ) : (
              <Box onClick={() => deleteInvitationPlace(p.id)} cursor="pointer">
                <Icon boxSize="16px" color="red.500">
                  <PiTrashLight></PiTrashLight>
                </Icon>
              </Box>
            )}
          </Flex>
        </Timeline.Title>
        <Timeline.Description>
          <Stack spaceY={4}>
            {p.timeList?.map((t) => {
              return (
                <TimeInput
                  placeId={p.id}
                  key={`time-${t.id}`}
                  timeData={t}
                ></TimeInput>
              );
            })}
          </Stack>
        </Timeline.Description>
        {/* <Text textStyle="sm">
                      We shipped your product via <strong>FedEx</strong> and it
                      should arrive within 3-5 business days.
                    </Text> */}
        <Flex mt={4}>
          <Button
            loading={isPending}
            onClick={() => postTime(p.id)}
            variant="outline"
            size="sm"
          >
            <LuPlus /> Add Event
          </Button>
        </Flex>
      </Timeline.Content>
    </Timeline.Item>
  );
}

export default PlaceItem;
