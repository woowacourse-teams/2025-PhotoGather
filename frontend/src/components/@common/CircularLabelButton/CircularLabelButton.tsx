import * as S from './CircularLabelButton.styles';

interface CircularLabelButton {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  text: string;
}

const CircularLabelButton = ({ icon, text }: CircularLabelButton) => {
  return (
    <S.Wrapper>
      <S.IconContainer>
        <S.IconWrapper>{icon}</S.IconWrapper>
      </S.IconContainer>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default CircularLabelButton;
