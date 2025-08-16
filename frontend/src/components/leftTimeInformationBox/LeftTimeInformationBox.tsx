import loadingImage from '@assets/images/loading.png';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './LeftTimeInformationBox.styles';

interface OpenDate {
  /** 오픈하는 날짜 */
  date: string;
  /** 오픈하는 시각 */
  time: string;
}

interface LeftTimeInformationBoxProps {
  /** 스페이스 타이틀 */
  title: string;
  /** 오픈까지 남은 날짜와 시간 */
  leftTime: string;
  /** 오픈하는 날짜와 시간 */
  openDate: OpenDate;
}

const LeftTimeInformationBox = ({
  title,
  leftTime,
  openDate,
}: LeftTimeInformationBoxProps) => {
  const hasNoLeftTime = leftTime === '00:00:00';

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.TopDescriptionContainer>
        <S.TopDescription>열리기까지</S.TopDescription>
        <S.TopLeftTime>{leftTime}</S.TopLeftTime>
      </S.TopDescriptionContainer>
      <S.Icon src={loadingImage} alt="loading" />
      {hasNoLeftTime ? (
        <HighlightText
          text={`지금 당장\n열릴 예정이에요`}
          highlightTextArray={['지금 당장']}
          highlightColorStyle="primary"
          fontStyle="bodyLarge"
        />
      ) : (
        <HighlightText
          text={`${openDate.date}\n${openDate.time}에 열릴 예정이에요`}
          highlightTextArray={[openDate.date, openDate.time]}
          highlightColorStyle="primary"
          fontStyle="bodyLarge"
        />
      )}
    </S.Wrapper>
  );
};

export default LeftTimeInformationBox;
