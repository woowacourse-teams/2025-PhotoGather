import { ReactComponent as KakaoLogo } from '@assets/icons/kakaotalk.svg';
import LoginImage from '@assets/images/login.png';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/@common/buttons/button/Button';
import IconLabelButton from '../../components/@common/buttons/iconLabelButton/IconLabelButton';
import HighlightText from '../../components/@common/highlightText/HighlightText';
import { ROUTES } from '../../constants/routes';
import { theme } from '../../styles/theme';
import * as S from './LoginPage.styles';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.LoginImage src={LoginImage} alt="로그인" />
        <S.TextContainer>
          <HighlightText
            text="로그인 후 서비스를 이용해주세요"
            highlightTextArray={['로그인']}
            fontStyle="header02"
            highlightColorStyle="primary"
          />
          <S.LoginLabel>당신의 사진을 모아 드릴게요</S.LoginLabel>
        </S.TextContainer>
      </S.TopContainer>
      <S.BottomContainer>
        <S.LoginButtonContainer>
          <IconLabelButton
            icon={<KakaoLogo />}
            style={{ backgroundColor: theme.colors.kakaoTalk }}
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
