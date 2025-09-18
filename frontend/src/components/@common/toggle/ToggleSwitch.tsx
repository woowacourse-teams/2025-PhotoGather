import * as S from './ToggleSwitch.styles';

export type ToggleSwitchSize = 'small' | 'medium' | 'large';

interface ToggleSwitchProps {
  /** 토글의 사이즈 */
  size?: ToggleSwitchSize;
  /** 토글 여부 */
  isToggle: boolean;
  /** 클릭 시 실행할 함수 */
  onToggleClick: () => void;
}

const ToggleSwitch = ({
  size = 'medium',
  isToggle,
  onToggleClick: handleToggleClick,
}: ToggleSwitchProps) => {
  return (
    <S.Wrapper $size={size} $isToggle={isToggle} onClick={handleToggleClick}>
      <S.Thumb $size={size} $isToggle={isToggle} />
    </S.Wrapper>
  );
};

export default ToggleSwitch;
