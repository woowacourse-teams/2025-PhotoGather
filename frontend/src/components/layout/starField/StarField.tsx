import * as S from './StarField.styles';

const stars = [
  { top: 5, left: 50, size: 30, delay: 0.5 },
  { top: 10, left: 87, size: 20, delay: 1.2 },
  { top: 98, left: 80, size: 10, delay: 2.1 },
  { top: 20, left: 9, size: 20, delay: 0.8 },
  { top: 2, left: 70, size: 13, delay: 1.7 },
  { top: 38, left: 88, size: 12, delay: 0.4 },
  { top: 42, left: 10, size: 22, delay: 2.5 },
  { top: 2, left: 20, size: 9, delay: 1.0 },
  { top: 95, left: 20, size: 22, delay: 0.9 },
  { top: 77, left: 8, size: 30, delay: 1.3 },
  { top: 83, left: 84, size: 29, delay: 2.8 },
  { top: 14, left: 67, size: 25, delay: 0.6 },
  { top: 96, left: 70, size: 15, delay: 1.1 },
  { top: 96, left: 40, size: 43, delay: 1.6 },
];

export const StarField = () => {
  return (
    <S.Wrapper>
      {stars.map((star, index) => (
        <S.StarContainer
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          key={index}
          top={star.top}
          left={star.left}
          size={star.size}
          delay={star.delay}
          star={index % 2 === 0 ? 'filled' : 'outlined'}
        />
      ))}
    </S.Wrapper>
  );
};
