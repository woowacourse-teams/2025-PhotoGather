import loadingImage from '@assets/images/loading.png';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './InformationConfirmBox.styles';

interface InformationConfirmBoxProps {
  /** 스페이스 타이틀 */
  title: string;
  /** 오픈 날짜와 시간 */
  openedAt: string;
}

const InformationConfirmBox = ({
  title,
  openedAt,
}: InformationConfirmBoxProps) => {
  const date = new Date(openedAt);
  const today = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours}시 ${minutes}분`;

  const dDay = '00:00:00';

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <HighlightText
        text={`열리기까지 ${dDay}`}
        highlightTextArray={[dDay]}
        highlightColorStyle="primary"
        fontStyle="header03"
      />
      <S.Icon src={loadingImage} alt="loading" />
      <HighlightText
        text={formattedDate}
        highlightTextArray={[formattedDate]}
        highlightColorStyle="primary"
        fontStyle="bodyLarge"
      />
      <HighlightText
        text={`${formattedTime}에 열릴 예정이에요`}
        highlightTextArray={[formattedTime]}
        highlightColorStyle="primary"
        fontStyle="bodyLarge"
      />
    </S.Wrapper>
  );
};

export default InformationConfirmBox;
