import * as S from './ToggleSwitch.styles';

interface ToggleSwitchProps {
  /** 토글 여부 */
  isToggle: boolean;
  /** 클릭 시 실행할 함수 */
  onToggleClick: () => void;
}

const ToggleSwitch = ({
  isToggle,
  onToggleClick: handleToggleClick,
}: ToggleSwitchProps) => {
  return (
    <S.Wrapper onClick={handleToggleClick}>
      {isToggle ? <p>토글됨</p> : <p>토글안됨</p>}
    </S.Wrapper>
  );
};

export default ToggleSwitch;
