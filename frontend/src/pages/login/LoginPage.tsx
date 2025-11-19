import { useNavigate } from 'react-router-dom';
import KakaoLogo from '../../@assets/icons/kakaotalk.svg?react';
import LogoSvg from '../../@assets/logo/logo.svg?react';
import IconButton from '../../components/@common/buttons/iconButton/IconButton';
import { TRY_IT_NOW_SPACE_CODE } from '../../constants/constants';
import { createGuestHomeRoute } from '../../constants/routes';
import useButtonTracking from '../../hooks/@common/useButtonTracking';
import useKakaoAuth from '../../hooks/domain/auth/useKakaoAuth';
import { theme } from '../../styles/theme';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin } = useKakaoAuth();
  const { trackClick } = useButtonTracking();
  const environment = import.meta.env.VITE_ENVIRONMENT;

  const handleTryItNowButton = () => {
    const isDevEnvironment =
      environment === 'development' || environment === 'local';

    const tryItNowSpaceCode = isDevEnvironment
      ? TRY_IT_NOW_SPACE_CODE.DEV
      : TRY_IT_NOW_SPACE_CODE.PROD;

    trackClick('login_try_it_now_button', {
      spaceCode: tryItNowSpaceCode,
    });

    navigate(createGuestHomeRoute(tryItNowSpaceCode));
  };

  return (
    <S.Wrapper>
      <S.TopContainer>
        <LogoSvg width={32} />
        <S.TextContainer>당신을 위한 순간, 흩어지지 않게</S.TextContainer>
      </S.TopContainer>

      <S.LoginBox>
        <S.DividerLineContainer>
          <S.LoginDividerLine />
          <S.DividerLineText>SNS 계정으로 로그인</S.DividerLineText>
          <S.LoginDividerLine />
        </S.DividerLineContainer>
        <IconButton
          icon={<KakaoLogo />}
          style={{ backgroundColor: theme.colors.kakaoTalk, border: 'none' }}
          onClick={handleKakaoLogin}
          variant="outline"
        />
      </S.LoginBox>
      <S.TryItNowButton onClick={handleTryItNowButton}>
        로그인 없이 포게더 체험하기
      </S.TryItNowButton>
    </S.Wrapper>
  );
};

export default LoginPage;
