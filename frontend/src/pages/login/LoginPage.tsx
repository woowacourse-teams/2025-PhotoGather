import { useNavigate } from 'react-router-dom';
import KakaoLogo from '../../@assets/icons/kakaoTalk.svg?react';
import Button from '../../components/@common/buttons/button/Button';
import IconButton from '../../components/@common/buttons/iconButton/IconButton';
import { ROUTES } from '../../constants/routes';
import useKakaoAuth from '../../hooks/domain/auth/useKakaoAuth';
import { theme } from '../../styles/theme';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleKakaoLogin } = useKakaoAuth();

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.TextContainer>로그인 데모 페이지</S.TextContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <S.LoginButtonContainer>
          <IconButton
            icon={<KakaoLogo />}
            style={{ backgroundColor: theme.colors.kakaoTalk, border: 'none' }}
            onClick={handleKakaoLogin}
            variant="outline"
          />
        </S.LoginButtonContainer>
        <Button
          text="메인 페이지로 돌아가기"
          onClick={() => navigate(ROUTES.MAIN)}
        />
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default LoginPage;
