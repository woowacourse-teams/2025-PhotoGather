import * as S from './Button.styles';
import type { ButtonVariant } from './variant';

interface ButtonProps {
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
}: ButtonProps) => {
  return (
    <S.StyledButton variant={variant} onClick={onClick} disabled={disabled}>
      {text}
    </S.StyledButton>
  );
};

export default Button;
