import * as S from './LinearProgressBar.styles';

export interface LinearProgressBarProps {
  percentage: number;
}

const LinearProgressBar = ({ percentage }: LinearProgressBarProps) => {
  return (
    <S.Wrapper>
      <S.ProgressElement $percentage={percentage} />
      <S.GlowElement $variant="start" />
      <S.GlowElement $variant="end" />
      <S.GlowElement $variant="progress" $percentage={percentage} />
    </S.Wrapper>
  );
};

export default LinearProgressBar;
