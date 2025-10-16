import type {
  IconButtonSize,
  IconButtonVariant,
} from '../../../../types/button.type';
import * as S from './IconButton.styles';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 아이콘 React Node */
  icon: React.ReactNode;
  /** 아이콘 버튼 스타일 */
  variant: IconButtonVariant;
  /** 아이콘 버튼 사이즈 */
  size?: IconButtonSize;
}

const IconButton = ({
  icon,
  variant = 'default',
  size = 'medium',
  ...buttonProps
}: IconButtonProps) => {
  return (
    <S.IconContainer {...buttonProps} $variant={variant} $size={size}>
      {icon}
    </S.IconContainer>
  );
};

export default IconButton;
