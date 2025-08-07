import LandingHeader from '../../components/header/landingHeader/LandingHeader';
import * as S from './LandingPage.styles';

const LandingPage = () => {
  return (
    <S.Wrapper>
      <LandingHeader />
      <S.LogoContainer></S.LogoContainer>
    </S.Wrapper>
  );
};

export default LandingPage;
