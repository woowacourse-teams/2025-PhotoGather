import * as S from './ToggleSwitch.styles';

export type ToggleSwitchSize = 'small' | 'medium' | 'large';

interface ThumbIconInfo {
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
}

interface ToggleSwitchProps {
  /** 토글의 사이즈 */
  size?: ToggleSwitchSize;
  /** 토글 여부 */
  isToggle: boolean;
  /** 클릭 시 실행할 함수 */
  onToggleClick: () => void;
  /** 아이콘 정보 */
  thumbIconInfo?: ThumbIconInfo;
}

const ToggleSwitch = ({
  size = 'medium',
  isToggle,
  onToggleClick: handleToggleClick,
  thumbIconInfo,
}: ToggleSwitchProps) => {
  const thumbIcon = isToggle ? thumbIconInfo?.onIcon : thumbIconInfo?.offIcon;

  return (
    <S.Wrapper
      $size={size}
      $isToggle={isToggle}
      onClick={handleToggleClick}
      aria-pressed={isToggle}
      role="switch"
    >
      <S.Thumb $size={size} $isToggle={isToggle}>
        <S.Icon>{thumbIcon}</S.Icon>
      </S.Thumb>
    </S.Wrapper>
  );
};

export default ToggleSwitch;
