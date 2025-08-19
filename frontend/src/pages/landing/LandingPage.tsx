import { ReactComponent as SaveIcon } from '@assets/icons/download.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/instagram.svg';
import { ReactComponent as KakaoTalkIcon } from '@assets/icons/kakaotalk.svg';
import { ReactComponent as QrcodeIcon } from '@assets/icons/qrCode.svg';
import { ReactComponent as Logo } from '@assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import FloatingActionButton from '../../components/@common/buttons/floatingActionButton/FloatingActionButton';
import IconLabelButton from '../../components/@common/buttons/iconLabelButton/IconLabelButton';
import Footer from '../../components/footer/Footer';
import LeftTimeInformationBox from '../../components/leftTimeInformationBox/LeftTimeInformationBox';
import { ROUTES } from '../../constants/routes';
import useLandingScroll from '../../hooks/@common/useLandingScroll';
import { theme } from '../../styles/theme';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './LandingPage.styles';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.SectionContainer>
        <S.TextContainer>당신을 위한 순간, 흩어지지 않게</S.TextContainer>
        <Logo fill={theme.colors.white} />
      </S.SectionContainer>

      <S.SectionContainer {...useLandingScroll({})}>
        <S.TextContainer>{`주인공은 당신이니까,\n당신을 위한 순간, 흩어지지 않게`}</S.TextContainer>
        <FloatingActionButton
          label="스페이스 생성하기"
          onClick={() => {
            navigate(ROUTES.CREATE);
            track.button('create_space_button', {
              page: 'landing_page',
              section: 'landing_page',
              action: 'create_space',
            });
          }}
        />
      </S.SectionContainer>

      <S.SectionContainer
        {...useLandingScroll({
          delay: 0.4,
          onVisible: () => track.sectionView('second_section', 2),
        })}
      >
        <S.TextContainer>{`3초면 끝\n링크 하나로 그 날의 추억을 모아요`}</S.TextContainer>
        <LeftTimeInformationBox
          title="나의 스페이스"
          leftTime="00:30:29"
          openDate={{ date: '2025년 7월 13일', time: '12시 30분' }}
        />
      </S.SectionContainer>

      <S.SectionContainer
        {...useLandingScroll({
          delay: 0.4,
          onVisible: () => track.sectionView('u', 3),
        })}
      >
        <S.TextContainer>{`귀찮은 로그인 없이\n사진 업로드 가능`}</S.TextContainer>
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
          onVisible: () => track.sectionView('last_section', 5),
        })}
      >
        <S.TextContainer>{`인스타그램, 카카오톡, QR코드\n빠르게 공유하고 사진을 모아보세요`}</S.TextContainer>
        <S.RowContainer>
          <InstagramIcon
            style={{
              height: '44px',
              marginBottom: '4px',
              cursor: 'default',
              pointerEvents: 'none',
            }}
          />
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
      <Footer />
    </S.Wrapper>
  );
};

export default LandingPage;
