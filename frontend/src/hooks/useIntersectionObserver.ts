import { useEffect, useRef, useState } from 'react';
import { DEBUG_MESSAGES } from '../constants/debugMessages';

interface UseIntersectionObserverProps {
  threshold?: number;
}

const useIntersectionObserver = ({
  threshold = 0.5,
}: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      console.warn(DEBUG_MESSAGES.INTERSECTION_OBSERVER);
      return;
    }

    if (!targetRef.current) return;

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold },
    );
    observer.current.observe(targetRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [threshold]);

  return { targetRef, isIntersecting };
};

export default useIntersectionObserver;
