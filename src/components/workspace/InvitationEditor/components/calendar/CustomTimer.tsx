// CustomTimer.js

import { Center, Flex, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import React from 'react';

import invitationEditorAtom from '@/atoms/invitationEditor';
import { useCountdown } from '@/hooks/utils/time.hook';

/**
 * 숫자를 두 자리 문자열로 포맷팅 (예: 9 -> 09)
 * @param {number} num - 숫자
 * @returns {string}
 */
const formatTime = (num: number): string => String(num).padStart(2, '0');

// 시간을 보여주는 작은 상자 컴포넌트 (선택 사항)
const TimeBox = ({ value, label }) => (
  <Flex
    direction="column"
    justifyContent={label ? 'center' : 'end'}
    alignItems="center"
  >
    <Text fontSize="xs" color="gray.400">
      {label.toUpperCase()}
    </Text>
    <Text fontSize="2xl">{value}</Text>
  </Flex>
);

/**
 * 목표 날짜까지 남은 시간을 표시하는 컴포넌트
 * @param {{ date: string | number | Date }} props
 * - date: 카운트다운을 할 목표 날짜 (필수 props)
 */
const CustomTimer = ({ date }: { date: Date | null | undefined }) => {
  // Custom Hook 호출하여 남은 시간 데이터 받기
  const { days, hours, minutes, seconds, isTimeUp } = useCountdown(date);
  const pointColor = useAtomValue(invitationEditorAtom.selectedPointColor);

  // 시간이 만료되었을 때 표시할 내용
  if (isTimeUp) {
    return (
      <div style={{ color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
        카운트다운 종료!
      </div>
    );
  }

  // 시간이 남아있을 때 표시할 내용
  return (
    <Center flexDir="column">
      <Flex textAlign="center" justifyContent="center" gap="20px">
        {/* 일 (Days) */}
        <TimeBox value={days} label="Days" />
        {/* 시 (Hours) */}
        <TimeBox value=":" label=""></TimeBox>
        <TimeBox value={formatTime(hours)} label="hour" />
        {/* 분 (Minutes) */}
        <TimeBox value=":" label=""></TimeBox>

        <TimeBox value={formatTime(minutes)} label="min" />
        {/* 초 (Seconds) */}
        <TimeBox value=":" label=""></TimeBox>
        <TimeBox value={formatTime(seconds)} label="sec" />
      </Flex>
      <Text color="gray.600" mt={4}>
        Wedding is{' '}
        <Text color={pointColor} as="strong">
          {days}
        </Text>{' '}
        days away
      </Text>
    </Center>
  );
};

export default CustomTimer;
