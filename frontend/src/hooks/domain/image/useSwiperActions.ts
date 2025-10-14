import { useState } from 'react';

interface UseImageSwiperProps {
  initialIndex: number;
}

const useSwiperActions = ({ initialIndex }: UseImageSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const updateCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    updateCurrentIndex,
  };
};

export default useSwiperActions;
