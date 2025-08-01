import { useEffect, useState } from 'react';
import type { Timer } from '../../types/timer.type';

interface UseTimerProps {
  openedAt: string;
}

const useTimer = ({ openedAt }: UseTimerProps) => {
  const [time, setTime] = useState<Timer>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const openedDate = new Date(openedAt);
      const timeDifference = openedDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(timeDifference / 1000);
      const totalHours = Math.floor(totalSeconds / 3600);
      const totalDays = Math.floor(totalHours / 24);
      const hoursLeft = totalHours % 24;
      const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
      const secondsLeft = totalSeconds % 60;

      setTime({
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

  return { time };
};

export default useTimer;
