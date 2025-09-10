import lockImage from '@assets/images/lock.png';
import HighlightText from '../../../components/@common/highlightText/HighlightText';
import StatusLayout from '../../../components/layout/statusLayout/StatusLayout';
import { formatDate } from '../../../utils/formatDate';
import * as C from '../StatusPage.common.styles';

interface EarlyPageProps {
  openedAt: string;
}

const EarlyPage = ({ openedAt }: EarlyPageProps) => {
  const { date, time } = formatDate(openedAt);

  return (
    <StatusLayout
      image={{ src: lockImage, alt: '만료' }}
      element={
        <C.DescriptionContainer>
          <HighlightText
            text={`${date} \n${time} 오픈 예정`}
            fontStyle="header02"
            highlightColorStyle="accent"
            highlightTextArray={[date, time]}
            textColorStyle="white"
          />
        </C.DescriptionContainer>
      }
    />
  );
};

export default EarlyPage;
