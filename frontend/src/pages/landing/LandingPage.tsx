import { useEffect, useMemo, useRef } from 'react';
import {
  KakaoTalkIcon,
  LogoIcon as Logo,
  QrCodeIcon as QrcodeIcon,
  DownloadIcon as SaveIcon,
} from '../../@assets/icons';
import {
  InstagramImg as InstagramIcon,
  MockupFourImg as MockupFour,
  MockupOneImg as MockupOne,
  MockupThreeImg as MockupThree,
  MockupTwoImg as MockupTwo,
} from '../../@assets/images';
import Button from '../../components/@common/buttons/button/Button';
import FloatingActionButton from '../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import IconLabelButton from '../../components/@common/buttons/iconLabelButton/IconLabelButton';
import { Carousel } from '../../components/carousel/Carousel';
import Footer from '../../components/footer/Footer';
import KakaoLoginButton from '../../components/kakaoLoginButton/KakaoLoginButton';
import LeftTimeInformationBox from '../../components/leftTimeInformationBox/LeftTimeInformationBox';
import { AUTH_COOKIES } from '../../constants/keys';
import useAuthActions from '../../hooks/@common/useAuthActions';
import useLandingScroll from '../../hooks/@common/useLandingScroll';
import useLeftTimer from '../../hooks/@common/useLeftTimer';
import useKakaoAuth from '../../hooks/domain/useKakaoAuth';
import { theme } from '../../styles/theme';
import { CookieUtils } from '../../utils/CookieUtils';
import { formatDate } from '../../utils/formatDate';
import { formatTimer } from '../../utils/formatTimer';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './LandingPage.styles';

const LandingPage = () => {
  const mockDate = useMemo(() => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setHours(today.getHours() + 8);
    return targetDate;
  }, []);
  const { leftTime } = useLeftTimer({ targetTime: mockDate.toString() });
  const formattedLeftTime = formatTimer(leftTime);
  const { date, time } = formatDate(mockDate.toISOString());
  const mockupRef = useRef<HTMLDivElement>(null);
  const { handleKakaoLogin } = useKakaoAuth();
  const { handleLogout } = useAuthActions();

  useEffect(() => {
    const target = mockupRef.current;
    if (!target) return;

    const onWheel = (event: WheelEvent) => {
      const atStart = target.scrollLeft <= 0;
      const atEnd =
        target.scrollLeft + target.clientWidth >= target.scrollWidth;
      //스크롤 위치 + 보여지는 위치 >= 전체 보여질 크기

      if ((!atStart && event.deltaY < 0) || (!atEnd && event.deltaY > 0)) {
        event.preventDefault(); // 세로 스크롤 막음
        target.scrollLeft += event.deltaY;
      }
    };

    target.addEventListener('wheel', onWheel, { passive: false });
    return () => target.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.TopContainer>
          <S.SectionContainer>
            <S.TextContainer>당신을 위한 순간, 흩어지지 않게</S.TextContainer>
            <Logo fill={theme.colors.white} />
          </S.SectionContainer>

          <S.LoginSection {...useLandingScroll({})}>
            <S.TextContainer>{`주인공은 당신이니까,\n사진은 우리가 책임질게요`}</S.TextContainer>
            {CookieUtils.has(AUTH_COOKIES.ACCESS) ? (
              <Button
                text="로그아웃"
                variant="secondary"
                onClick={handleLogout}
              />
            ) : (
              <KakaoLoginButton onClick={handleKakaoLogin} />
            )}
          </S.LoginSection>
        </S.TopContainer>

        <S.SectionContainer
          {...useLandingScroll({
            delay: 0.4,
            onVisible: () => track.sectionView('second_section', 2),
          })}
        >
          <S.TextContainer>{`3초면 끝\n링크 하나로 그 날의 추억을 모아요`}</S.TextContainer>
          <LeftTimeInformationBox
            title="나의 스페이스"
            leftTime={formattedLeftTime}
            openDate={{
              date: date,
              time: time,
            }}
          />
        </S.SectionContainer>

        <S.SectionContainer
          {...useLandingScroll({
            delay: 0.4,
            onVisible: () => track.sectionView('third_section', 4),
          })}
        >
          <S.TextContainer>{`화질 걱정 없이,\n원본 그대로 보관하세요`}</S.TextContainer>
          <Carousel
            slides={[
              <S.Mockup src={MockupOne} key="one" />,
              <S.Mockup src={MockupTwo} key="two" />,
              <S.Mockup src={MockupThree} key="three" />,
              <S.Mockup src={MockupFour} key="four" />,
            ]}
          />
        </S.SectionContainer>

        <S.SectionContainer
          {...useLandingScroll({
            delay: 0.4,
            onVisible: () => track.sectionView('third_section', 4),
          })}
        >
          <S.TextContainer>{`한번에 사진 다운로드\n클릭 한번으로 추억 정리 끝`}</S.TextContainer>
          <FloatingActionButton
            label="모두 저장하기"
            icon={<SaveIcon fill={theme.colors.gray06} />}
            style={{ cursor: 'default', pointerEvents: 'none' }}
          />
        </S.SectionContainer>

        <S.SectionContainer
          {...useLandingScroll({
            delay: 0.4,
            onVisible: () => track.sectionView('third_section', 4),
          })}
        >
          <S.TextContainer>{`귀찮은 로그인 없이,\n사진 업로드 가능해요`}</S.TextContainer>
          <Carousel
            slides={[
              <S.Mockup src={MockupOne} key="one" />,
              <S.Mockup src={MockupTwo} key="two" />,
              <S.Mockup src={MockupThree} key="three" />,
              <S.Mockup src={MockupFour} key="four" />,
            ]}
          />
        </S.SectionContainer>

        <S.SectionContainer
          {...useLandingScroll({
            delay: 0.4,
            onVisible: () => track.sectionView('last_section', 5),
          })}
        >
          <S.TextContainer>{`인스타그램, 카카오톡, QR코드\n빠르게 공유하고 사진을 모아보세요`}</S.TextContainer>
          <S.RowContainer>
            <S.InstagramIcon src={InstagramIcon} />
            <IconLabelButton
              icon={<KakaoTalkIcon />}
              style={{
                backgroundColor: theme.colors.kakaoTalk,
                cursor: 'default',
                pointerEvents: 'none',
              }}
            />
            <IconLabelButton
              icon={<QrcodeIcon />}
              style={{
                width: '44px',
                cursor: 'default',
                pointerEvents: 'none',
              }}
            />
          </S.RowContainer>
        </S.SectionContainer>
      </S.Wrapper>
      <Footer />
    </>
  );
};

export default LandingPage;
