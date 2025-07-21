import useHasMountedRef from '../../hooks/useHasMountedRef';
import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  /** 현재 단계값 */
  step: number;
  /** 모든 단계값 */
  maxStep: number;
}

const ProgressBar = ({ step, maxStep }: ProgressBarProps) => {
  const { current } = useHasMountedRef();

  return (
    <S.Wrapper>
      {Array.from({ length: maxStep }).map((_, index) => {
        const isFilled = index + 1 <= step;
        return (
          <S.ProgressElement
            // biome-ignore lint/suspicious/noArrayIndexKey: false positive
            key={index}
            $isFilled={isFilled}
            $shouldAnimate={current}
          />
        );
      })}
    </S.Wrapper>
  );
};

export default ProgressBar;
