import * as S from './CircularLabelButton.styles';

interface CircularLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  text: string;
}

const CircularLabelButton = ({
  icon,
  text,
  ...buttonProps
}: CircularLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer {...buttonProps}>{icon}</S.IconContainer>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default CircularLabelButton;
