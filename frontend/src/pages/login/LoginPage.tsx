import KakaoLogo from '../../@assets/icons/kakaoTalk.svg?react';
import LogoSvg from '../../@assets/logo/logo.svg?react';
import IconButton from '../../components/@common/buttons/iconButton/IconButton';
import useKakaoAuth from '../../hooks/domain/auth/useKakaoAuth';
import { theme } from '../../styles/theme';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  const { handleKakaoLogin } = useKakaoAuth();

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
    </S.Wrapper>
  );
};

export default LoginPage;
