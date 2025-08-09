import lockImage from '@assets/images/lock.png';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import StatusLayout from '../../../components/layout/statusLayout/StatusLayout';
import { changeKSTDate } from '../../../utils/changeKSTDate';
import { formatDate } from '../../../utils/formatDate';
import * as S from './EarlyPage.styles';

interface EarlyPageProps {
  openedAt: Date | string;
}

const EarlyPage = ({ openedAt }: EarlyPageProps) => {
  const kstOpenedAt = changeKSTDate(new Date(openedAt)).kstDate.toISOString();
  const { date, time } = formatDate(kstOpenedAt as string);

  return (
    <StatusLayout
      image={{ src: lockImage, alt: '만료' }}
      element={
        <S.DescriptionContainer>
          <HighlightText
            text={`${date} \n${time} 오픈 예정`}
            fontStyle="header02"
            highlightColorStyle="accent"
            highlightTextArray={[date, time]}
            textColorStyle="white"
          />
        </S.DescriptionContainer>
      }
    />
  );
};

export default EarlyPage;
