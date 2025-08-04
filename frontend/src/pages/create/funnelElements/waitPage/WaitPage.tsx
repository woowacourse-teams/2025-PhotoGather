import loadingImage from '@assets/images/loading.png';
import type { SpaceFunnelInfo } from '../../../../types/space.type';
import * as S from './WaitPage.styles';

interface WaitPageProps {
  spaceInfo: SpaceFunnelInfo;
}

const WaitPage = ({ spaceInfo }: WaitPageProps) => {
  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.Title>조금만 기다려주세요</S.Title>
        <S.Title>곧 스페이스 생성이 끝나요</S.Title>
      </S.TitleContainer>
      <S.Icon src={loadingImage} alt="loading" />
      <S.InfoContainer>
        <S.InfoTitle>{spaceInfo.name}</S.InfoTitle>
        <S.InfoDescription>{spaceInfo.date}</S.InfoDescription>
        <S.InfoDescription>{spaceInfo.time}</S.InfoDescription>
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default WaitPage;
