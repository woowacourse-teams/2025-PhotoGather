import * as S from './RoundedButton.styles';

interface RoundedButtonProps {
  /** 버튼 텍스트 */
  text: string;
  /** 버튼 비활성화 여부 */
  disabled?: boolean;
}

const RoundedButton = ({ text, disabled }: RoundedButtonProps) => {
  return (
    <S.Wrapper disabled={disabled}>
      <S.Text>{text}</S.Text>
    </S.Wrapper>
  );
};

export default RoundedButton;
