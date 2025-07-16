import * as S from './CircularLabelButton.styles';

interface CircularLabelButtonProps {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  text: string;
}

const CircularLabelButton = ({ icon, text }: CircularLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer>
        <S.Icon>{icon}</S.Icon>
      </S.IconContainer>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default CircularLabelButton;
