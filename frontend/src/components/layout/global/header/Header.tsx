import { ReactComponent as SettingSvg } from '@assets/icons/setting.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { theme } from '../../../../styles/theme';
import * as S from './Header.styles';

export type HeaderMode = 'default' | 'setting' | 'none';

interface HeaderProps {
  /** 프로필 이미지 */
  profileImageSrc: string;
  /** 헤더 모드 */
  mode?: HeaderMode;
}

const Header = ({ profileImageSrc, mode = 'default' }: HeaderProps) => {
  const navigate = useNavigate();

  const defaultMode = mode === 'default';
  const settingMode = mode === 'setting';
  const noneMode = mode === 'none';

  return (
    <S.Wrapper>
      <button type="button" onClick={() => navigate(ROUTES.LANDING)}>
        <Logo fill={theme.colors.white} width={100} />
      </button>
      {noneMode && null}
      {settingMode && (
        <S.SettingButton type="button" onClick={() => navigate(ROUTES.LOGOUT)}>
          <SettingSvg fill={theme.colors.white} />
        </S.SettingButton>
      )}
      {defaultMode && (
        <S.ProfileImageButton
          type="button"
          onClick={() => navigate(ROUTES.MYPAGE)}
        >
          <img src={profileImageSrc} alt="내 프로필 사진" />
        </S.ProfileImageButton>
      )}
    </S.Wrapper>
  );
};

export default Header;
