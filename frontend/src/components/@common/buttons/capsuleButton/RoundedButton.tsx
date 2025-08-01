import * as S from './RoundedButton.styles';

interface RoundedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}

const RoundedButton = ({
  text,
  disabled,
  ...buttonProps
}: RoundedButtonProps) => {
  return (
    <S.Wrapper disabled={disabled} {...buttonProps}>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default RoundedButton;
