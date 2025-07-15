import * as S from './CircularLabelButton.styles';

interface CircularLabelButton {
  icon: React.ReactNode;
  text: string;
}

const CircularLabelButton = ({ icon, text }: CircularLabelButton) => {
  return (
    <S.Wrapper>
      <S.IconContainer>
        <S.IconWrapper>
          {icon}
        </S.IconWrapper>
      </S.IconContainer>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default CircularLabelButton;
