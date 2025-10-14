import { useState } from 'react';

interface UseImageSwiperProps {
  initialIndex: number;
}

const useImageSwiper = ({ initialIndex }: UseImageSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const updateCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };
  return {
    currentIndex,
    updateCurrentIndex,
  };
};

export default useImageSwiper;
