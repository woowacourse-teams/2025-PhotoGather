import * as S from './Line.styles';

interface LineProps {
  /** 중간 선의 길이 */
  width?: number;
  /** 왼쪽 요소 */
  leftElement?: React.ReactNode;
  /** 오른쪽 요소 */
  rightElement?: React.ReactNode;
}

const Line = ({ width = 100, leftElement, rightElement }: LineProps) => {
  return (
    <S.LineContainer>
      <S.ButtonContainer>{leftElement}</S.ButtonContainer>
      <S.Line $width={width} />
      <S.ButtonContainer>{rightElement}</S.ButtonContainer>
    </S.LineContainer>
  );
};

export default Line;
