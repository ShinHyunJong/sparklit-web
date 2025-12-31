// useCountdown.js (수정됨)

import { useEffect, useState } from 'react';

// 시간 단위를 밀리초(ms)로 정의
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const INITIAL_TIME = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isTimeUp: true,
};

/**
 * 특정 날짜(targetDate)까지 남은 일, 시, 분, 초를 계산하고 1초마다 업데이트합니다.
 * @param {string | number | Date | null | undefined} targetDate - 카운트다운 목표 날짜
 * @returns {{
 * days: number,
 * hours: number,
 * minutes: number,
 * seconds: number,
 * isTimeUp: boolean
 * }}
 */
export const useCountdown = (targetDate: Date | null | undefined) => {
  // 1. targetDate 유효성 검사 및 초기화
  const isValidDate = targetDate !== null && targetDate !== undefined;
  let targetTime = 0;

  if (isValidDate) {
    const dateObject = new Date(targetDate);
    // Date 객체가 유효하지 않은 경우 (예: "invalid string")에도 처리
    if (isNaN(dateObject.getTime())) {
      targetTime = 0;
    } else {
      targetTime = dateObject.getTime();
    }
  }

  /**
   * 남은 시간(밀리초)을 계산하는 함수
   * @param {number} distance - 목표 시간과 현재 시간의 차이 (밀리초)
   */
  const calculateTimeLeft = (distance) => {
    // 시간이 0 이하이거나 유효하지 않은 targetDate인 경우
    if (distance <= 0) {
      return INITIAL_TIME;
    }

    // 남은 시간 계산
    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    return { days, hours, minutes, seconds, isTimeUp: false };
  };

  // 초기 상태 설정: 유효한 targetDate가 없으면 즉시 {0, 0, 0, 0, true} 반환
  const [timeLeft, setTimeLeft] = useState(
    targetTime > 0
      ? calculateTimeLeft(targetTime - new Date().getTime())
      : INITIAL_TIME,
  );

  useEffect(() => {
    // targetDate가 유효하지 않거나 (null, undefined) 또는 유효한 시간으로 변환되지 않으면
    // 타이머를 설정하지 않고 즉시 종료 (이미 초기 상태에서 0으로 설정됨)
    if (targetTime <= 0) {
      setTimeLeft(INITIAL_TIME); // 혹시 모를 경우 다시 초기화
      return;
    }

    // 유효한 targetTime이 있을 경우에만 타이머 설정
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      const newTimeLeft = calculateTimeLeft(distance);
      setTimeLeft(newTimeLeft);

      // 시간이 만료되면 타이머를 정리(clear)
      if (newTimeLeft.isTimeUp) {
        clearInterval(interval);
      }
    }, 1000); // 1000ms = 1초

    // 컴포넌트 언마운트 시 또는 targetDate가 변경될 때 타이머 정리
    return () => clearInterval(interval);
  }, [targetTime]); // targetTime에 의존성을 두어 로직을 간결하게 유지

  return timeLeft;
};
