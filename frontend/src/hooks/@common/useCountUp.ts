import { useEffect, useState } from 'react';

interface CountUpProps {
  initialNumber?: number;
  targetNumber: number;
  time?: number;
  isActive?: boolean;
}

const useCountUp = ({
  initialNumber = 0,
  targetNumber,
  time = 1500,
  isActive = true,
}: CountUpProps) => {
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    if (!isActive) {
      setNumber(initialNumber);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const totalValue = targetNumber - initialNumber;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / time, 1);
      const currentValue = initialNumber + totalValue * progress;

      setNumber(Math.floor(currentValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialNumber, targetNumber, time, isActive]);

  return { number };
};

export default useCountUp;
