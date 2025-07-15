import * as S from './Button.styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ variant = 'primary', text, onClick, disabled = false }: ButtonProps) => {
  return (
    <S.StyledButton
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </S.StyledButton>
  );
};

export default Button;
