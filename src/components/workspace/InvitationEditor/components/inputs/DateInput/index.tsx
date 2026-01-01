import { Accordion, DataList, Flex, Input, Text } from '@chakra-ui/react';
import { format, isValid, parse } from 'date-fns';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';

import invitationEditorAtom from '@/atoms/invitationEditor';
import day from '@/helpers/date.helper';
import { useSaveInvitation } from '@/hooks/invitation';

type FormValues = {
  date: string | null;
};

function DateInput({ date }: { date?: Date | null }) {
  const { onClickSave } = useSaveInvitation();

  const [selectedDate, setSelectedDate] = useAtom(
    invitationEditorAtom.selectedDate,
  );

  const [month, setMonth] = useState<Date>(date ? new Date(date) : new Date());

  useEffect(() => {
    if (date) {
      const formattedDate = day(date);
      setSelectedDate(formattedDate.format('MM/DD/YYYY'));
      setMonth(new Date(date));
    }
  }, [date]);

  const { setValue, control } = useForm<FormValues>({
    defaultValues: {
      date: date
        ? format(date, 'MM/dd/yyyy')
        : format(new Date(), 'MM/dd/yyyy'),
    },
  });

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      // setInputValue("");
      setValue('date', '');
      setSelectedDate('');
    } else {
      setSelectedDate(format(date, 'MM/dd/yyyy'));
      setMonth(date);
      setValue('date', format(date, 'MM/dd/yyyy')); // Format date to YYYY-MM-DD
      onClickSave(date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedDate = parse(e.target.value, 'MM/dd/yyyy', new Date());
    if (isValid(parsedDate)) {
      setSelectedDate(format(parsedDate, 'MM/dd/yyyy'));
      setMonth(parsedDate);
      onClickSave(parsedDate);
    } else {
      setSelectedDate('');
    }
  };

  return (
    <Accordion.Item
      borderBottomWidth={0}
      borderRadius={'sm'}
      value="date"
      bg="white"
    >
      <Accordion.ItemTrigger borderBottomWidth={1}>
        <Flex borderRadius="sm" p={4} w="full">
          <Text>Date</Text>
        </Flex>
        <Accordion.ItemIndicator bg="white" mr={4} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>
          <Flex p={4} flexDirection="column" gap={4}>
            <DataList.Root orientation="horizontal">
              <DataList.Item>
                <DataList.ItemLabel>Date</DataList.ItemLabel>
                <DataList.ItemValue>
                  <Flex direction="column" gapY={4}>
                    <Flex p={4} bg="gray.100" borderRadius="sm">
                      <DayPicker
                        month={month}
                        onMonthChange={setMonth}
                        selected={
                          selectedDate ? new Date(selectedDate) : undefined
                        }
                        mode="single"
                        onSelect={handleDayPickerSelect}
                      ></DayPicker>
                    </Flex>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          variant="subtle"
                          placeholder="MM/DD/YYYY"
                          value={field.value ? field.value : ''}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleInputChange(e);
                          }}
                        />
                      )}
                    ></Controller>
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

export default DateInput;
