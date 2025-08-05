import type { IconButtonVariant } from '../../../../types/button.type';
import * as S from './IconLabelButton.styles';

interface IconLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 텍스트 */
  label?: string;
  /** 버튼 스타일 */
  variant?: IconButtonVariant;
}

const IconLabelButton = ({
  icon,
  label,
  variant = 'default',
  ...buttonProps
}: IconLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer {...buttonProps} $variant={variant}>
        {icon}
      </S.IconContainer>
      <S.Text>{label}</S.Text>
    </S.Wrapper>
  );
};

export default IconLabelButton;
