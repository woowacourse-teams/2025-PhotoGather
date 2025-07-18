import type { ButtonVariant } from '../../../../types/buttonTypes';
import * as S from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 variant */
  variant?: ButtonVariant;
  /** 버튼 내부 텍스트 */
  text: string;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const Button = ({
  variant = 'primary',
  text,
  onClick,
  disabled = false,
  ...buttonProps
}: ButtonProps) => {
  return (
    <S.StyledButton
      {...buttonProps}
      $variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </S.StyledButton>
  );
};

export default Button;
