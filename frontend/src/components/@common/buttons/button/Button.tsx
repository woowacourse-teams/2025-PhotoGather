import * as S from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 variant */
  variant?: keyof typeof S.buttonStyles;
  /** 버튼 내부 텍스트 */
  text: string;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const Button = ({
  variant = 'primary',
  text,
  disabled = false,
  ...buttonProps
}: ButtonProps) => {
  return (
    <S.StyledButton {...buttonProps} $variant={variant} disabled={disabled}>
      {text}
    </S.StyledButton>
  );
};

export default Button;
