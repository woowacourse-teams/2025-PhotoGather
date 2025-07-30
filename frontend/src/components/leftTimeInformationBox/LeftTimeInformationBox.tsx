import loadingImage from '@assets/images/loading.png';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import HighlightText from '../@common/highlightText/HighlightText';
import * as S from './LeftTimeInformationBox.styles';

interface InformationConfirmBoxProps {
  /** 스페이스 타이틀 */
  title: string;
  /** 오픈까지 남은 날짜와 시간 */
  leftTime: string;
  /** 오픈하는 날짜와 시간 */
  openDate: string;
}

const LeftTimeInformationBox = ({
  title,
  leftTime,
  openDate,
}: InformationConfirmBoxProps) => {
  // TODO: 코드 삭제
  const date = new Date(openDate);
  const today = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // TODO: 컴포넌트를 사용하는 페이지에서 이렇게 구현
  const formattedDate = formatDate(year, month, day);
  const formattedTime = formatTime(hours, minutes);

  // TODO: hook으로 분리
  const timeDiff = date.getTime() - today.getTime();
  const totalSeconds = Math.floor(Math.abs(timeDiff) / 1000);
  const totalHours = Math.floor(totalSeconds / (60 * 60)); // 1시간 = 3600초
  const totalDays = Math.floor(totalHours / 24);
  const hoursLeft = totalHours % 24;
  const minutesLeft = Math.floor((totalSeconds % (60 * 60)) / 60);
  const secondsLeft = totalSeconds % 60;

  const dDay =
    totalHours < 24
      ? `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`
      : `${totalDays}일`;

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

export default LeftTimeInformationBox;
