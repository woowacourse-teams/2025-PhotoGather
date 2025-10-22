import { type MotionProps, motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import completeImage from '../../@assets/images/screenshots/complete.png';
import guestbookImage from '../../@assets/images/screenshots/guestbook.png';
import hostMainImage from '../../@assets/images/screenshots/host-main.png';
import introduceImage from '../../@assets/images/screenshots/introduce.png';
import spaceImage from '../../@assets/images/screenshots/space.png';
import visibilityImage from '../../@assets/images/screenshots/visibility.png';
import titleImage from '../../@assets/logo/main-logo.png';
import Button from '../../components/@common/buttons/button/Button';
import { AUTH_COOKIES } from '../../constants/cookie';
import { ROUTES } from '../../constants/routes';
import useButtonTracking from '../../hooks/@common/useButtonTracking';
import { CookieUtils } from '../../utils/cookie';
import * as S from './LandingPage.styles';

const MotionSection = motion(S.Section);
const MotionTitleContainer = motion(S.TitleContainer);
const MotionScreenshotBox = motion(S.ScreenshotBox);
const MotionSubTitle = motion(S.SubTitle);

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const delaySectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      staggerChildren: 1,
    },
  },
};

const sectionMotionProps: MotionProps = {
  variants: fadeVariants,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.3 },
};

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = CookieUtils.get(AUTH_COOKIES.ACCESS);
  const { trackClick } = useButtonTracking({
    userType: isLoggedIn ? 'host' : 'guest',
  });

  const handleStartButton = () => {
    if (isLoggedIn) {
      trackClick('landing_start_button', {
        page: '/landing',
        status: 'logged_in',
        destination: ROUTES.HOST.MAIN,
      });
      navigate(ROUTES.HOST.MAIN);
      return;
    }
    trackClick('landing_start_button', {
      page: '/landing',
      status: 'not_logged_in',
      destination: ROUTES.AUTH.LOGIN,
    });
    navigate(ROUTES.AUTH.LOGIN);
  };

  return (
    <S.Wrapper>
      <S.ContentContainer>
        <MotionSection
          style={{ gap: '156px' }}
          {...sectionMotionProps}
          variants={delaySectionVariants}
        >
          <MotionTitleContainer variants={fadeVariants}>
            <S.Title>당신을 위한 순간, 흩어지지 않게</S.Title>
            <S.TitleImage src={titleImage} alt="포게더 로고 이미지" />
          </MotionTitleContainer>
          <MotionTitleContainer variants={fadeVariants}>
            <S.SmallTitle>작가와 방문객이 연결되는 공간</S.SmallTitle>
            <Button
              text="시작하기"
              variant="secondary"
              onClick={handleStartButton}
            />
          </MotionTitleContainer>
        </MotionSection>
        <MotionSection {...sectionMotionProps}>
          <S.SubTitle>
            {
              '스페이스를 통해 작품을 소개하고,\n방문객의 진심 어린 축하를 간직하세요.'
            }
          </S.SubTitle>
        </MotionSection>
        <MotionSection {...sectionMotionProps}>
          <S.SubTitle>
            {`포게더는 작가들이 겪고 있는\n이런 문제를 해결해요.`}
          </S.SubTitle>
          <S.Bubble>
            {`전시 공간이 부족해서\n작품 소개 등 개인 공간을 만들지 못했어요.`}
          </S.Bubble>
          <S.Bubble>
            {`내가 상주하는 시간을\n방문객에게 알릴 수 없어 불편했어요.`}
          </S.Bubble>
          <S.Bubble>
            {`방문객이 전달해준 축하 메시지와\n사진이 흩어져 관리하기 불편했어요.`}
          </S.Bubble>
          <S.Bubble>
            {`전시가 끝나고, 축하 받은 것들이\n기록으로 남지 않아 아쉬웠어요.`}
          </S.Bubble>
        </MotionSection>
        <S.Section>
          <MotionSubTitle {...sectionMotionProps}>
            {'포게더는 이런 기능을 제공해요.'}
          </MotionSubTitle>
          <S.ScreenshotBoxContainer>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`20초면 완성되는 나만의 스페이스`}</S.DescriptionTitle>
              <S.Screenshot src={hostMainImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`손쉽고 빠르게\n개인 전시 공간을 만들 수 있어요.`}</S.Description>
            </MotionScreenshotBox>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`QR 코드 하나로 공유`}</S.DescriptionTitle>
              <S.Screenshot src={completeImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`링크 또는 QR 코드만으로\n방문객에게 스페이스를 공유해요.`}</S.Description>
            </MotionScreenshotBox>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`작품 소개 작성`}</S.DescriptionTitle>
              <S.Screenshot src={introduceImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`열심히 만든 전시작품에 대한 소개를\n상세히 작성할 수 있어요.`}</S.Description>
            </MotionScreenshotBox>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`작가 메시지 전달`}</S.DescriptionTitle>
              <S.Screenshot src={spaceImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`상주 시간, 인스타그램 등\n방문객에게 전하고 싶은 정보를 남겨요.`}</S.Description>
            </MotionScreenshotBox>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`실시간 방명록`}</S.DescriptionTitle>
              <S.Screenshot src={guestbookImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`방문객들이 남긴 축하를\n한 곳에서 실시간으로 확인해요.`}</S.Description>
            </MotionScreenshotBox>
            <MotionScreenshotBox {...sectionMotionProps}>
              <S.DescriptionTitle>{`비공개 설정`}</S.DescriptionTitle>
              <S.Screenshot src={visibilityImage} alt="휴대폰 사진 이미지" />
              <S.Description>{`나만 볼 수 있는\n프라이빗한 방명록으로 운영할 수 있어요.`}</S.Description>
            </MotionScreenshotBox>
          </S.ScreenshotBoxContainer>
        </S.Section>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default LandingPage;
