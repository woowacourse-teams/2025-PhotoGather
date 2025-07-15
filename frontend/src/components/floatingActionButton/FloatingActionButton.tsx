import * as S from './FloatingActionButton.styles';

interface FloatingActionButtonProps {
    /** FAB 버튼 라벨 */
  label: string;
   /** FAB 버튼 아이콘*/
  icon?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick?: () => void;
  /** 버튼 클릭했을 때 실행할 함수*/
  disabled?: boolean;
}

const FloatingActionButton = ({
  label,
  onClick,
  icon,
  disabled = false,
}: FloatingActionButtonProps) => {
  return (
    <S.Wrapper
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
