'use client';
import {
  Box,
  Center,
  Circle,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { Fade } from 'react-awesome-reveal';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useInvitationDetail } from '@/hooks/invitation';

import CustomTimer from './CustomTimer';

const generateCalendarDays = (year: number, month: number) => {
  // ... 위 1번 섹션의 generateCalendarDays 함수 내용 ...
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, isCurrentMonth: false });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      dayOfMonth: i,
      isCurrentMonth: true,
      isTargetDate: year === 2025 && month === 11 && i === 25,
    });
  }

  const remainingCells = 42 - days.length;
  for (let i = 0; i < remainingCells && days.length % 7 !== 0; i++) {
    days.push({ date: null, isCurrentMonth: false });
  }

  return days;
};

function CustomCalendar() {
  const { invitationDetail } = useInvitationDetail();
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);
  const [selectedDate] = useAtom(invitationEditorAtom.selectedDate);

  const d = new Date(selectedDate);
  const firstPlace = invitationDetail?.placeList
    ? invitationDetail.placeList[0]
    : null;

  const firstTime = firstPlace?.timeList ? firstPlace.timeList[0] : null;
  if (!firstTime) return null;
  const calendarDays = generateCalendarDays(d.getFullYear(), d.getMonth());
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeAddedDate = dayjs(d)
    .set('hour', dayjs(firstTime.time).hour())
    .set('minute', dayjs(firstTime.time).minute())
    .toDate();
  return (
    <Fade triggerOnce>
      <Box px={8}>
        <Center flexDir="column" mb={6}>
          <Text letterSpacing={4} mb={2} fontSize="2xl">
            {dayjs(d).format('YYYY.MM.DD')}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {dayjs(d).format('ddd')}{' '}
            {firstTime ? dayjs(firstTime.time).format('A HH:mm') : ''}
          </Text>
        </Center>
        <SimpleGrid
          columns={7}
          gap={3}
          borderTopWidth={1}
          borderBottomWidth={1}
          py={6}
          mb={12}
        >
          {weekdays.map((day, i) => (
            <GridItem mb={2} key={day} style={{ textAlign: 'center' }}>
              <Text color={i === 0 ? pointColor : 'gray.800'}>{day}</Text>
            </GridItem>
          ))}
          {calendarDays.map((day, index) => {
            const isTargetDate = d.getDate() === day.dayOfMonth;
            const isSunday = day.date ? day.date.getDay() === 0 : false;
            return (
              <GridItem key={index}>
                <Circle
                  bg={isTargetDate ? pointColor : ''}
                  w="30px"
                  h="30px"
                  mx="auto"
                >
                  <Text
                    color={
                      isTargetDate
                        ? 'white'
                        : isSunday
                          ? pointColor
                          : 'gray.700'
                    }
                  >
                    {day.date ? day.dayOfMonth : ''}
                  </Text>
                </Circle>
              </GridItem>
            );
          })}
        </SimpleGrid>
        <CustomTimer date={timeAddedDate}></CustomTimer>
      </Box>
    </Fade>
  );
}

export default CustomCalendar;
