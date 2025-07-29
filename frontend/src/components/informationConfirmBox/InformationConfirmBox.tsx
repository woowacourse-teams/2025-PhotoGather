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

  const timeDiff = date.getTime() - today.getTime();
  const totalSeconds = Math.floor(Math.abs(timeDiff) / 1000);
  const totalHours = Math.floor(totalSeconds / (60 * 60)); // 1시간 = 3600초
  const minutesLeft = Math.floor((totalSeconds % (60 * 60)) / 60);
  const secondsLeft = totalSeconds % 60;

  const dDay = `${totalHours.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <HighlightText
        text={`열리기까지 ${dDay}`}
        highlightTextArray={[dDay || '']}
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
