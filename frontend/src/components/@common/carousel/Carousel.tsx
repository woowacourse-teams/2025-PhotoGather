import { useCallback, useEffect, useState } from 'react';
import * as S from './Carousel.styles';

interface CarouselProps {
  /** 슬라이드 컴포넌트 */
  slides: React.ReactNode[];
  /** 커서가 들어오면 일시정지 */
  pauseOnHover?: boolean;
}

export const Carousel = ({ slides, pauseOnHover = true }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const extendedSlides = [...slides, slides[0]];
  const lastIndex = extendedSlides.length - 1;
  const displayIndex = currentIndex === lastIndex ? 0 : currentIndex;

  const snapTo = (index: number) => {
    setIsTransitioning(false);
    setCurrentIndex(index);
  };

  const animateTo = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    if (currentIndex === lastIndex && index !== 0) {
      snapTo(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateTo(index);
        });
      });
      return;
    }
    animateTo(index);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(snapTo): suppress dependency snapTo
  const resetIndexAndTransition = useCallback(() => {
    setTimeout(() => {
      snapTo(0);
    }, 1);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies(animateTo): suppress dependency animateTo
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (currentIndex === lastIndex) {
        resetIndexAndTransition();
      }
      animateTo(
        ((prev: number) => (prev + 1) % extendedSlides.length)(currentIndex),
      );
    }, 2500);

    return () => clearInterval(timer);
  }, [
    currentIndex,
    extendedSlides.length,
    lastIndex,
    resetIndexAndTransition,
    isPaused,
  ]);

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  return (
    <S.Wrapper
      onMouseEnter={() => {
        if (!isTouchDevice && pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice && pauseOnHover) setIsPaused(false);
      }}
    >
      <S.SlidesContainer
        $currentIndex={currentIndex}
        $isTransitioning={isTransitioning}
      >
        {extendedSlides.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          <S.Slide key={`slide-${index}`}>{item}</S.Slide>
        ))}
      </S.SlidesContainer>

      <S.DotsContainer>
        {slides.map((_, index) => (
          <S.DotContainer
            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
            key={index}
            onClick={() => goToSlide(index)}
            $isActive={displayIndex === index}
          />
        ))}
      </S.DotsContainer>
    </S.Wrapper>
  );
};
