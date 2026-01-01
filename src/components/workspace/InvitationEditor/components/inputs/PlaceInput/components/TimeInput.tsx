import {
  Box,
  Button,
  DataList,
  Flex,
  Icon,
  Input,
  Menu,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiTrashLight } from 'react-icons/pi';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useDeleteInvitationPlaceTime } from '@/hooks/invitation/place';
import { useUpdateHourMinutePlaceTime } from '@/hooks/place';
import type { InvitationPlaceTime } from '@/types/model';

import { ampmList, hourList, minuteList } from '../../DateInput/constant';

type FormValues = {
  name: string;
  description: string;
};

function TimeInput({
  placeId,
  timeData,
}: {
  placeId: number;
  timeData: InvitationPlaceTime;
}) {
  const [date, setDate] = useAtom(invitationEditorAtom.selectedDate);
  const [selectedAmPm, setSelectedAmPm] = useState(
    dayjs(timeData.time).format('A'),
  );
  const [selectedHour, setSelectedHour] = useState(
    dayjs(timeData.time).format('hh'),
  );
  const [selectedMinute, setSelectedMinute] = useState(
    dayjs(timeData.time).format('mm'),
  );
  const { register, getValues, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'onBlur',
  });
  const { updatePlaceTime } = useUpdateHourMinutePlaceTime();
  const { deletePlaceTime, isPending: isDeleting } =
    useDeleteInvitationPlaceTime();

  useEffect(() => {
    setValue('name', timeData.name || '');
    setValue('description', timeData.description || '');
  }, [timeData]);

  const handleAmPmClick = (ap: string) => {
    setSelectedAmPm(ap);
    updatePlaceTime(
      timeData.id,
      selectedHour,
      selectedMinute,
      ap,
      getValues('name'),
      getValues('description'),
    );
  };

  const handleHourClick = async (h: { time: string }) => {
    setSelectedHour(`${h.time}`);
    updatePlaceTime(
      timeData.id,
      h.time,
      selectedMinute,
      selectedAmPm,
      getValues('name'),
      getValues('description'),
    );
  };

  const handleMinuteClick = (m: { time: string }) => {
    setSelectedMinute(m.time);
    updatePlaceTime(
      timeData.id,
      selectedHour,
      m.time,
      selectedAmPm,
      getValues('name'),
      getValues('description'),
    );
  };

  const onNameBlur = (value: string) => {
    updatePlaceTime(
      timeData.id,
      selectedHour,
      selectedMinute,
      selectedAmPm,
      value,
      getValues('description'),
    );
  };

  const onDescriptionBlur = (value: string) => {
    updatePlaceTime(
      timeData.id,
      selectedHour,
      selectedMinute,
      selectedAmPm,
      getValues('name'),
      value,
    );
  };

  return (
    <Flex gap={3}>
      <DataList.Root>
        <DataList.Item>
          <DataList.ItemLabel>Time</DataList.ItemLabel>
          <DataList.ItemValue>
            <Flex gap={1} alignItems="center">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="subtle" size="sm">
                    {selectedHour || t('hour')}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {hourList.map((h) => {
                        return (
                          <Menu.Item
                            onClick={() => handleHourClick(h)}
                            key={`$${h.time}`}
                            value={`$${h.time}`}
                          >
                            {h.time}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Text>:</Text>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="subtle" size="sm">
                    {selectedMinute || 'Minute'}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {minuteList.map((m) => {
                        return (
                          <Menu.Item
                            key={`m-${m.time}`}
                            onClick={() => handleMinuteClick(m)}
                            value={m.time}
                          >
                            {m.time}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="subtle" size="sm">
                    {selectedAmPm || 'AM/PM'}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {ampmList.map((ap) => {
                        return (
                          <Menu.Item
                            onClick={() => handleAmPmClick(ap.ampm)}
                            key={`$${ap.ampm}`}
                            value={`$${ap.ampm}`}
                          >
                            {ap.ampm}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Flex>
          </DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
      <DataList.Root>
        <DataList.Item>
          <DataList.ItemLabel>Event Name</DataList.ItemLabel>
          <Input
            placeholder="Reception, Cocktail"
            {...register('name')}
            variant="subtle"
            onBlur={() => onNameBlur(getValues('name'))}
          ></Input>
        </DataList.Item>
      </DataList.Root>
      <DataList.Root>
        <DataList.Item>
          <DataList.ItemLabel>Description</DataList.ItemLabel>
          <Input
            placeholder="2nd floor, Banquet Hall"
            {...register('description')}
            variant="subtle"
            onBlur={() => onDescriptionBlur(getValues('description'))}
          ></Input>
        </DataList.Item>
      </DataList.Root>
      <Flex alignItems="center">
        {isDeleting ? (
          <Spinner></Spinner>
        ) : (
          <Box
            onClick={() => deletePlaceTime(timeData.id)}
            role="button"
            cursor="pointer"
          >
            <Icon color="red.400" boxSize="16px">
              <PiTrashLight></PiTrashLight>
            </Icon>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default TimeInput;
