import { useEffect, useRef, useState } from 'react';

interface UseLandingScroll {
  duration?: number;
  delay?: number;
  onVisible?: () => void;
}

const useLandingScroll = ({
  duration = 0.8,
  delay = 0,
  onVisible,
}: UseLandingScroll) => {
  const dom = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        if (onVisible && !firedRef.current) {
          firedRef.current = true;
          onVisible();
        }
      },
      { threshold: 0.3 },
    );

    if (dom.current) observer.observe(dom.current);
    return () => observer.disconnect();
  }, [onVisible]);

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(20px)',
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
  };

  return { ref: dom, style };
};

export default useLandingScroll;
