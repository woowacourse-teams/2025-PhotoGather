import * as S from './LinearProgressBar.styles';

export interface LinearProgressBarProps {
  progressBarWidth: number;
  percentage: number;
}

const LinearProgressBar = ({
  progressBarWidth,
  percentage,
}: LinearProgressBarProps) => {
  const progressBarScale = Math.min(Math.max(percentage, 0), 100) / 100;
  const glowElementPosition =
    (progressBarWidth * Math.min(Math.max(percentage, 0), 100)) / 100;

  return (
    <S.Wrapper>
      <S.ProgressContainer $progressWidth={progressBarWidth}>
        <S.ProgressElement $progressBarScale={progressBarScale} />
      </S.ProgressContainer>

      <S.GlowElement
        $variant="progress"
        $glowElementPosition={glowElementPosition}
      />
    </S.Wrapper>
  );
};

export default LinearProgressBar;
