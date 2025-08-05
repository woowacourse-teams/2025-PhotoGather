import * as S from './FloatingActionButton.styles';

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** FAB 버튼 라벨 */
  label: string | React.ReactNode;
  /** FAB 버튼 아이콘*/
  icon?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick?: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const FloatingActionButton = ({
  label,
  onClick,
  icon,
  disabled = false,
  ...buttonProps
}: FloatingActionButtonProps) => {
  return (
    <S.Wrapper
      {...buttonProps}
      $variant={disabled ? 'disabled' : 'default'}
      onClick={onClick}
      aria-disabled={disabled}
      disabled={disabled}
    >
      {label}
      {icon}
    </S.Wrapper>
  );
};

export default FloatingActionButton;
