import { LoadingImg as loadingImage } from '../../../../@assets/images';
import HighlightText from '../../../../components/@common/highlightText/HighlightText';
import { INFORMATION } from '../../../../constants/messages';
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
        {INFORMATION.WAIT_PAGE.TITLE_LIST.map((title, index) => (
          <S.Title key={title + String(index)}>{title}</S.Title>
        ))}
      </S.TitleContainer>
      <S.Icon src={loadingImage} alt="loading" />
      <S.InfoContainer>
        <S.InfoTitle>{spaceInfo.name}</S.InfoTitle>
        <S.InfoDescription>{date}</S.InfoDescription>
        {spaceInfo.isImmediateOpen ? (
          <HighlightText
            fontStyle="bodyLarge"
            highlightColorStyle="primary"
            text={`지금 당장 오픈`}
            highlightTextArray={['지금 당장']}
          />
        ) : (
          <HighlightText
            fontStyle="bodyLarge"
            highlightColorStyle="primary"
            text={`${time} 오픈`}
            highlightTextArray={[time]}
          />
        )}
      </S.InfoContainer>
    </S.Wrapper>
  );
};

export default WaitPage;
