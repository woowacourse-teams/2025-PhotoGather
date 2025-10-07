import { useEffect } from 'react';

const useScrollLock = (isActive: boolean) => {
  useEffect(() => {
    if (!isActive) return;
    document.body.classList.add('scroll-lock');
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isActive]);
};

export default useScrollLock;
