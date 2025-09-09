import * as S from './BorderButton.styles';

interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 테두리 버튼 요소의 색깔 */
  color?: string;
  /** 테두리 버튼 내부 요소 */
  element?: React.ReactNode;
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 버튼 활성화 여부*/
  disabled?: boolean;
}

const BorderButton = ({
  color = '#4b4b4b',
  element,
  onClick,
  disabled = false,
  ...buttonProps
}: BorderButtonProps) => {
  return (
    <S.StyledBorderButton
      {...buttonProps}
      $color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {element}
    </S.StyledBorderButton>
  );
};

export default BorderButton;
