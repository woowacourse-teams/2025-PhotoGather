import { useRef } from 'react';

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
  debug?: boolean;
}

interface SwipeHandlers {
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
}

const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  debug = false,
}: UseSwipeOptions = {}): SwipeHandlers => {
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isSwipingRef.current = true;

    e.currentTarget.setPointerCapture(e.pointerId);

    if (debug) {
      console.log('Swipe start:', { x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isSwipingRef.current) return;

    const diffX = startXRef.current - e.clientX;
    const diffY = startYRef.current - e.clientY;
    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    if (debug) {
      console.log('Swipe end:', {
        diffX,
        diffY,
        threshold,
      });
    }

    if (absDiffX > absDiffY && absDiffX > threshold) {
      if (diffX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    isSwipingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    isSwipingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (debug) {
      console.log('Swipe cancelled');
    }
  };

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };
};

export default useSwipe;
