import { useEffect } from 'react';

const useScrollLock = (isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.classList.add('scroll-lock');

    return () => {
      document.body.classList.remove('scroll-lock');
      document.body.style.paddingRight = '';
    };
  }, [isActive]);
};

export default useScrollLock;
