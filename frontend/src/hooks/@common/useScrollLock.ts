import { useEffect } from 'react';

const useScrollLock = () => {
  useEffect(() => {
    document.body.classList.add('scroll-lock');
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);
};

export default useScrollLock;
