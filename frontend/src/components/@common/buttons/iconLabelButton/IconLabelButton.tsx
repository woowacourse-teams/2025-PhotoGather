import type { IconLabelButtonVariant } from '../../../../types/button.type';
import * as S from './IconLabelButton.styles';

interface IconLabelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 버튼 스타일 */
  variant: IconLabelButtonVariant;
  /** 아이콘 텍스트 */
  label?: string;
}

const IconLabelButton = ({
  icon,
  variant = 'default',
  label,
  ...buttonProps
}: IconLabelButtonProps) => {
  return (
    <S.Wrapper>
      <S.IconContainer {...buttonProps} $variant={variant}>
        {icon}
      </S.IconContainer>
      {label && <S.Text>{label}</S.Text>}
    </S.Wrapper>
  );
};

export default IconLabelButton;
