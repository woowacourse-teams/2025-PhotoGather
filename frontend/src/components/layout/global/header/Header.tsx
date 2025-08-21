import { ReactComponent as SettingSvg } from '@assets/icons/setting.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { theme } from '../../../../styles/theme';
import * as S from './Header.styles';

interface HeaderProps {
  /** 프로필 이미지 */
  profileImageSrc: string;
  /** 로그인 여부 */
  isLoggedIn?: boolean;
  /** 로딩 상태 */
  isLoading?: boolean;
}

const Header = ({
  profileImageSrc,
  isLoggedIn = false,
  isLoading = false,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMainPage = location.pathname === ROUTES.MAIN;
  const isLogoutPage = location.pathname === ROUTES.LOGOUT;
  const isMyPage = location.pathname === ROUTES.MYPAGE;

  return (
    <S.Wrapper>
      <button type="button" onClick={() => navigate(ROUTES.LANDING)}>
        <Logo fill={theme.colors.white} width={100} />
      </button>

      {isLogoutPage && null}
      {isMainPage && !isLoggedIn && null}
      {isMainPage && isLoggedIn && !isLoading && (
        <S.ProfileImageButton
          type="button"
          onClick={() => navigate(ROUTES.MYPAGE)}
        >
          <img src={profileImageSrc} alt="프로필 이미지" />
        </S.ProfileImageButton>
      )}

      {isMyPage && (
        <S.SettingButton type="button" onClick={() => navigate(ROUTES.LOGOUT)}>
          <SettingSvg fill={theme.colors.white} />
        </S.SettingButton>
      )}

      {!isMainPage && !isLogoutPage && !isMyPage && (
        <S.ProfileImageButton
          type="button"
          onClick={() => navigate(ROUTES.MYPAGE)}
        >
          <img src={profileImageSrc} alt="프로필 이미지" />
        </S.ProfileImageButton>
      )}
    </S.Wrapper>
  );
};

export default Header;
