import { useEffect, useRef } from 'react';

const useHasMountedRef = () => {
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return hasMounted;
};

export default useHasMountedRef;
