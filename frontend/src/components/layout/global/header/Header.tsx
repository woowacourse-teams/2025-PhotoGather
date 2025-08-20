import { ReactComponent as Logo } from '@assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { theme } from '../../../../styles/theme';
import * as S from './Header.styles';

interface HeaderProps {
  profileImageSrc: string;
}

const Header = ({ profileImageSrc }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <button type="button" onClick={() => navigate(ROUTES.MAIN)}>
        <Logo fill={theme.colors.white} width={100} />
      </button>
      <S.ProfileImageButton
        type="button"
        onClick={() => navigate(ROUTES.MYPAGE)}
      >
        <img src={profileImageSrc} alt="내 프로필 사진" />
      </S.ProfileImageButton>
    </S.Wrapper>
  );
};

export default Header;
