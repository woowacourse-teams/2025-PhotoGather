import * as S from './Toggle.styles';

interface ToggleProps {
  /** 토글 여부 */
  isToggle: boolean;
  /** 클릭 시 실행할 함수 */
  onToggleClick: () => void;
}

const Toggle = ({
  isToggle,
  onToggleClick: handleToggleClick,
}: ToggleProps) => {
  return (
    <S.Wrapper onClick={handleToggleClick}>
      {isToggle ? <p>토글됨</p> : <p>토글안됨</p>}
    </S.Wrapper>
  );
};

export default Toggle;
