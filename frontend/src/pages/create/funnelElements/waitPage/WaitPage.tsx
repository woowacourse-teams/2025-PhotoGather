import loadingImage from '@assets/images/loading.png';
import HighlightText from '../../../../components/@common/highlightText/HighlightText';
import type { SpaceFunnelInfo } from '../../../../types/space.type';
import { formatDate } from '../../../../utils/formatDate';
import * as S from './WaitPage.styles';

interface WaitPageProps {
  spaceInfo: SpaceFunnelInfo;
}

const WaitPage = ({ spaceInfo }: WaitPageProps) => {
  const { date, time } = formatDate(`${spaceInfo.date}T${spaceInfo.time}`);

  return (
    <S.Wrapper>
      <S.TitleContainer>
        <S.Title>조금만 기다려주세요</S.Title>
        <S.Title>곧 스페이스 생성이 끝나요</S.Title>
      </S.TitleContainer>
      <S.Icon src={loadingImage} alt="loading" />
      <S.InfoContainer>
        <S.InfoTitle>{spaceInfo.name}</S.InfoTitle>
        <S.InfoDescription>{date}</S.InfoDescription>
        <HighlightText
          fontStyle="bodyLarge"
          highlightColorStyle="primary"
          text={`${time} 생성 예정`}
          highlightTextArray={[time]}
        />
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default WaitPage;
