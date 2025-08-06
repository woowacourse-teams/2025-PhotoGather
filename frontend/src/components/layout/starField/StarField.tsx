import { StarContainer } from './StarField.styles';

const stars = [
  { top: 5, left: 10, size: 30, delay: 0.5 },
  { top: 12, left: 80, size: 20, delay: 1.2 },
  { top: 18, left: 30, size: 10, delay: 2.1 },
  { top: 25, left: 60, size: 20, delay: 0.8 },
  { top: 33, left: 20, size: 13, delay: 1.7 },
  { top: 38, left: 75, size: 12, delay: 0.4 },
  { top: 42, left: 15, size: 8, delay: 2.5 },
  { top: 47, left: 50, size: 9, delay: 1.0 },
  { top: 53, left: 70, size: 22, delay: 0.9 },
  { top: 60, left: 25, size: 30, delay: 1.3 },
  { top: 66, left: 65, size: 29, delay: 2.8 },
  { top: 72, left: 35, size: 25, delay: 0.6 },
  { top: 78, left: 85, size: 15, delay: 1.1 },
  { top: 84, left: 40, size: 19, delay: 2.0 },
  { top: 90, left: 55, size: 43, delay: 1.6 },
];

export const StarField = () => {
  return (
    <>
      {stars.map((star, index) => (
        <StarContainer
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          key={index}
          top={star.top}
          left={star.left}
          size={star.size}
          delay={star.delay}
          star={index % 2 === 0 ? 'filled' : 'outlined'}
        />
      ))}
    </>
  );
};
