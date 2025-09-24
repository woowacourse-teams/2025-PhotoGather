import { KakaoTalkIcon as KakaoIcon } from '../../../@assets/icons';
import * as S from './KakaoLoginButton.styles';

export type IconPosition = 'left' | 'center';

interface KakaoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 클릭했을 때 실행할 함수*/
  onClick: () => void;
  /** 카카오 아이콘 위치 */
  iconPosition?: IconPosition;
  /** 버튼 비활성화 여부*/
  disabled?: boolean;
}

const KakaoLoginButton = ({
  onClick,
  iconPosition = 'center',
  disabled = false,
  ...buttonProps
}: KakaoButtonProps) => {
  return (
    <S.KakaoStyledButton
      {...buttonProps}
      onClick={onClick}
      disabled={disabled}
      $iconPosition={iconPosition}
    >
      <KakaoIcon width={16} height={16} />
      <S.Label>카카오 로그인</S.Label>
    </S.KakaoStyledButton>
  );
};

export default KakaoLoginButton;
