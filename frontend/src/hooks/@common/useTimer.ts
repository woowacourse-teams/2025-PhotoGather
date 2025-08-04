import { useEffect, useState } from 'react';
import { DEBUG_MESSAGES } from '../../constants/debugMessages';
import type { Timer } from '../../types/timer.type';
import { isParsableToDate } from '../../utils/isParsableToDate';

interface UseTimerProps {
  openedAt: string;
}

const useLeftTimer = ({ openedAt }: UseTimerProps) => {
  const [leftTime, setLeftTime] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      if (!isParsableToDate(openedAt)) {
        console.warn(
          `${DEBUG_MESSAGES.CAN_NOT_PARSE_TO_DATE} useLeftTimer: "${openedAt}"`,
        );
        setLeftTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const openedDate = new Date(openedAt);

      const timeDifference = openedDate.getTime() - now.getTime();
      if (timeDifference <= 0) {
        setLeftTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(timeDifference / 1000);
      const totalHours = Math.floor(totalSeconds / 3600);
      const totalDays = Math.floor(totalHours / 24);
      const hoursLeft = totalHours % 24;
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const secondsLeft = totalSeconds % 60;

      setLeftTime({
        days: totalDays,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    };

    calculateTimeLeft();

    const timerId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerId);
  }, [openedAt]);

  return { leftTime };
};

export default useLeftTimer;
