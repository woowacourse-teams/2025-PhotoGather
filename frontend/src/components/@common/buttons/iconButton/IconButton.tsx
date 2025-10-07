import type { IconButtonVariant } from '../../../../types/button.type';
import * as S from './IconButton.styles';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 버튼 스타일 */
  variant: IconButtonVariant;
}

const IconButton = ({
  icon,
  variant = 'default',
  ...buttonProps
}: IconButtonProps) => {
  return (
    <S.IconContainer {...buttonProps} $variant={variant}>
      {icon}
    </S.IconContainer>
  );
};

export default IconButton;
