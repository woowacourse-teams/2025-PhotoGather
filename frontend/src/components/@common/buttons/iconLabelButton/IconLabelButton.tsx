import * as S from './IconLabelButton.styles';

interface IconLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  label: string;
}

const IconLabelButton = ({
  icon,
  label,
  ...buttonProps
}: IconLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer {...buttonProps}>{icon}</S.IconContainer>
      <S.Text>{label}</S.Text>
    </S.Wrapper>
  );
};

export default IconLabelButton;
