import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  /** 현재 단계값 */
  currentStep: number;
  /** 모든 단계값 */
  maxStep: number;
}

const ProgressBar = ({ currentStep, maxStep }: ProgressBarProps) => {
  return (
    <S.Wrapper>
      {Array.from({ length: maxStep }).map((_, index) => {
        const isFilled = index + 1 <= currentStep;
        return (
          <S.ProgressElement
            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
            key={index}
            $isFilled={isFilled}
          />
        );
      })}
    </S.Wrapper>
  );
};

export default ProgressBar;
