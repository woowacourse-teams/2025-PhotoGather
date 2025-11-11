import { useEffect, useState } from 'react';

interface CountUpNumberProps {
  initialNumber?: number;
  targetNumber: number;
  time?: number;
}

const CountUpNumber = ({
  initialNumber = 0,
  targetNumber,
  time = 1000,
}: CountUpNumberProps) => {
  const [number, setNumber] = useState(initialNumber);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const totalValue = targetNumber - initialNumber;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / time, 1);
      const currentValue = initialNumber + totalValue * progress;

      setNumber(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [initialNumber, targetNumber, time]);

  return <p>{Math.round(number)}</p>;
};

export default CountUpNumber;
