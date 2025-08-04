import loadingImage from '@assets/images/loading.png';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './LeftTimeInformationBox.styles';

interface OpenDate {
  /** 오픈하는 날짜 */
  date: string;
  /** 오픈하는 시각 */
  time: string;
}

interface InformationConfirmBoxProps {
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
}: InformationConfirmBoxProps) => {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <HighlightText
        text={`열리기까지 ${leftTime}`}
        highlightTextArray={[leftTime || '']}
        highlightColorStyle="primary"
        fontStyle="header03"
      />
      <S.Icon src={loadingImage} alt="loading" />
      <HighlightText
        text={`${openDate.date}\n${openDate.time}에 열릴 예정이에요`}
        highlightTextArray={[openDate.date, openDate.time]}
        highlightColorStyle="primary"
        fontStyle="bodyLarge"
      />
    </S.Wrapper>
  );
};

export default LeftTimeInformationBox;
