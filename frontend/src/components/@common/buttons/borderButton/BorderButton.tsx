import { theme } from '../../../../styles/theme';
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
  /** 버튼의 색깔 (테두리 및 내부) */
  color: string;
  /** 클릭 시 실행할 함수 */
  onClick: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const BorderButton = ({
  heading,
  description,
  color = theme.colors.gray03,
  onClick,
  disabled,
  ...buttonProps
}: BorderButtonProps) => {
  return (
    <S.Wrapper
      {...buttonProps}
      $color={color}
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
