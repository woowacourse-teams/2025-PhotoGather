import { useEffect, useRef, useState } from 'react';
import { DEBUG_MESSAGES } from '../constants/debugMessages';

interface UseIntersectionObserverProps {
  threshold?: number;
  isInitialInView?: boolean;
  rootMargin?: string;
}

const useIntersectionObserver = ({
  threshold = 0.5,
  isInitialInView = false,
  rootMargin = '100px',
}: UseIntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(isInitialInView);

  const reObserve = () => {
    if (!targetRef.current) return;
    observer.current?.unobserve(targetRef.current);
    setIsIntersecting(false);
    observer.current?.observe(targetRef.current);
  };

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
      { threshold, rootMargin },
    );
    observer.current.observe(targetRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  return { targetRef, isIntersecting, reObserve };
};

export default useIntersectionObserver;
