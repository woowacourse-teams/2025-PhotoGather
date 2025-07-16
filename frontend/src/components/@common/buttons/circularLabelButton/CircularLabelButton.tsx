import * as S from './CircularLabelButton.styles';

interface CircularLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  label: string;
}

const CircularLabelButton = ({
  icon,
  label,
  ...buttonProps
}: CircularLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer {...buttonProps}>{icon}</S.IconContainer>
      <S.Text>{label}</S.Text>
    </S.Wrapper>
  );
};

export default CircularLabelButton;
