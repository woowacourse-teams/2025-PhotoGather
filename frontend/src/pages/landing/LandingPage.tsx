import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import { ReactComponent as GoogleIcon } from '@assets/icons/google.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram.svg';
import { ReactComponent as KakaoTalkIcon } from '@assets/icons/kakaotalk.svg';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { ReactComponent as NaverIcon } from '@assets/icons/naver.svg';
import { ReactComponent as QrcodeIcon } from '@assets/icons/qrCode.svg';
import { useNavigate } from 'react-router-dom';
import FloatingActionButton from '../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import IconLabelButton from '../../components/@common/buttons/iconLabelButton/IconLabelButton';
import LandingHeader from '../../components/header/landingHeader/LandingHeader';
import LeftTimeInformationBox from '../../components/leftTimeInformationBox/LeftTimeInformationBox';
import { ROUTES } from '../../constants/routes';
import useLandingScroll from '../../hooks/@common/useLandingScroll';
import { theme } from '../../styles/theme';
import * as S from './LandingPage.styles';

//TODO: 캐러셀 추가
//TODO: 별 애니메이션 추가

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LandingHeader />
      <S.Wrapper>
        <S.SectionContainer>
          <S.TextContainer>당신을 위한 순간, 흩어지지 않게</S.TextContainer>
          <Logo />
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll()}>
          <S.TextContainer>{`주인공은 당신이니까,\n당신을 위한 순간, 흩어지지 않게`}</S.TextContainer>
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll(0.8, 0.4)}>
          <S.TextContainer>소셜 로그인으로 시작하기</S.TextContainer>
          <S.RowContainer>
            <IconLabelButton
              icon={<NaverIcon />}
              style={{ backgroundColor: theme.colors.naver }}
              onClick={() => {}}
            />
            <IconLabelButton
              icon={<KakaoTalkIcon />}
              style={{ backgroundColor: theme.colors.kakaoTalk }}
              onClick={() => {
                navigate(ROUTES.CREATE);
              }}
            />
            <IconLabelButton
              icon={<GoogleIcon />}
              style={{ backgroundColor: theme.colors.white }}
            />
          </S.RowContainer>
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll(0.8, 0.4)}>
          <S.TextContainer>{`3초면 끝\n링크 하나로 그 날의 추억을 모아요`}</S.TextContainer>
          <LeftTimeInformationBox
            title="나의 스페이스"
            leftTime="00:30:29"
            //TODO: 현재 날짜로 넣어두기
            openDate={{ date: '2025년 7월 13일', time: '12시 30분' }}
          />
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll(0.8, 0.4)}>
          <S.TextContainer>{`귀찮은 로그인 없이\n사진 업로드 가능`}</S.TextContainer>
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll(0.8, 0.4)}>
          <S.TextContainer>{`한번에 사진 다운로드\n클릭 한번으로 추억 정리 끝`}</S.TextContainer>
          <FloatingActionButton
            label="모두 저장하기"
            icon={<SaveIcon fill={theme.colors.gray06} />}
          />
        </S.SectionContainer>

        <S.SectionContainer {...useLandingScroll(0.8, 0.4)}>
          <S.TextContainer>{`인스타그램, 카카오톡, QR코드\n빠르게 공유하고 사진을 모아보세요`}</S.TextContainer>
          <S.RowContainer>
            <InstagramIcon />
            <IconLabelButton
              icon={<KakaoTalkIcon />}
              style={{ backgroundColor: theme.colors.kakaoTalk }}
            />
            <IconLabelButton icon={<QrcodeIcon />} />
          </S.RowContainer>
        </S.SectionContainer>
      </S.Wrapper>
    </>
  );
};

export default LandingPage;
