import { useEffect, useState } from 'react';
import { DEBUG_MESSAGES } from '../../constants/debugMessages';
import type { Timer } from '../../types/timer.type';
import { calculateTimeDifference } from '../../utils/dateTimeFormatters';
import { isParsableToDate } from '../../utils/isParsableToDate';

interface UseTimerProps {
  targetTime: string;
}

const useLeftTimer = ({ targetTime }: UseTimerProps) => {
  const [leftTime, setLeftTime] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      if (!isParsableToDate(targetTime)) {
        console.warn(
          `${DEBUG_MESSAGES.CAN_NOT_PARSE_TO_DATE} useLeftTimer: "${targetTime}"`,
        );
        setLeftTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const openedDate = new Date(targetTime);

      const timer = calculateTimeDifference(openedDate, now);
      setLeftTime(timer);
    };

    calculateTimeLeft();

    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [targetTime]);

  return { leftTime };
};

export default useLeftTimer;
