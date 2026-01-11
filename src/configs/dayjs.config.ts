import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const initDayjsTimezone = () => {
  if (typeof window === 'undefined') return;
  dayjs.tz.setDefault(dayjs.tz.guess());
};

export const getUserTimezone = () => {
  if (typeof window === 'undefined') return 'UTC';
  return dayjs.tz.guess();
};

export default dayjs;
