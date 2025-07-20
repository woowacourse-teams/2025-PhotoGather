import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  /** 현재 단계값 */
  step: number;
  /** 모든 단계값 */
  maxStep: number;
}

const ProgressBar = ({ step, maxStep }: ProgressBarProps) => {
  return (
    <S.Wrapper>
      {Array.from({ length: maxStep }).map((_, index) => {
        const isFilled = index + 1 <= step;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: false positive
          <S.ProgressElement key={index} $isFilled={isFilled} />
        );
      })}
    </S.Wrapper>
  );
};

export default ProgressBar;
