import * as S from './BorderButton.styles';

interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 제목 부분 */
  heading: {
    text: string;
    icon?: React.ReactNode;
  };
  /** 버튼의 설명 */
  description: string;
  /** 버튼의 variant */
  variant?: keyof typeof S.borderButtonStyles;
  /** 클릭 시 실행할 함수 */
  onClick: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const BorderButton = ({
  heading,
  description,
  variant = 'unselected',
  onClick,
  disabled,
  ...buttonProps
}: BorderButtonProps) => {
  return (
    <S.Wrapper
      {...buttonProps}
      $variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      <S.ContentContainer>
        <S.TitleContainer>
          <S.Title>{heading.text}</S.Title>
          {heading.icon && <>{heading.icon}</>}
        </S.TitleContainer>
        <S.Description>{description}</S.Description>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default BorderButton;
