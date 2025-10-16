import { type TouchEvent, useRef } from 'react';

interface UseSwipeProps {
  onLeftToRight: () => void;
  onRightToLeft: () => void;
  swipeDistance?: number;
}

const useSwipeElement = ({
  onLeftToRight,
  onRightToLeft,
  swipeDistance = 80,
}: UseSwipeProps) => {
  const swipeStartPointRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0];
    swipeStartPointRef.current = { x: clientX, y: clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!swipeStartPointRef.current) return;

    const { clientX, clientY } = event.changedTouches[0];
    const deltaX = clientX - swipeStartPointRef.current.x;
    const deltaY = clientY - swipeStartPointRef.current.y;
    swipeStartPointRef.current = null;

    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);

    if (
      horizontalDistance < swipeDistance ||
      horizontalDistance <= verticalDistance
    ) {
      return;
    }

    if (deltaX < 0) {
      onRightToLeft();
      return;
    }

    onLeftToRight();
  };

  const handleTouchCancel = () => {
    swipeStartPointRef.current = null;
  };

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchCancel,
  };
};

export default useSwipeElement;
