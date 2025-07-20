import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  step: number;
  maxStep: number;
}

const ProgressBar = ({ step, maxStep }: ProgressBarProps) => {
  return (
    <S.Wrapper>
      <p>프로그래스바임</p>
    </S.Wrapper>
  );
};

export default ProgressBar;
