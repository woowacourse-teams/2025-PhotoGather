import { useNavigate } from 'react-router-dom';
import { KakaoTalkIcon as KakaoLogo } from '../../@assets/icons';
import { LoginImg as LoginImage } from '../../@assets/images';
import Button from '../../components/@common/buttons/button/Button';
import IconLabelButton from '../../components/@common/buttons/iconLabelButton/IconLabelButton';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import { INFORMATION } from '../../constants/messages';
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
        <S.LoginImage src={LoginImage} alt="로그인" />
        <S.TextContainer>
          <HighlightText
            text={INFORMATION.LOGIN.TITLE.TEXT}
            highlightTextArray={[INFORMATION.LOGIN.TITLE.HIGHLIGHT_TEXT]}
            fontStyle="header02"
            highlightColorStyle="primary"
          />
          <S.LoginLabel>{INFORMATION.LOGIN.DESCRIPTION}</S.LoginLabel>
        </S.TextContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <S.LoginButtonContainer>
          <IconLabelButton
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
