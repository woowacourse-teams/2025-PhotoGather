import LeftTimeInformationBox from '../../../components/leftTimeInformationBox/LeftTimeInformationBox';
import { INFORMATION } from '../../../constants/messages';
import useLeftTimer from '../../../hooks/@common/useLeftTimer';
import type { FunnelElementProps } from '../../../types/funnel.type';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import { formatDate } from '../../../utils/formatDate';
import { formatTimer } from '../../../utils/formatTimer';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

interface CheckSpaceInfoPageProps extends FunnelElementProps {
  spaceInfo: SpaceFunnelInfo;
}

const CheckSpaceInfoElement = ({
  spaceInfo,
  onNext,
}: CheckSpaceInfoPageProps) => {
  const openedAt = `${spaceInfo.date}T${spaceInfo.time}`;
  const { date, time } = formatDate(openedAt);
  const { leftTime } = useLeftTimer({ targetTime: openedAt });

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.CHECK_SPACE_INFO.TITLE.TEXT,
        highlightTextArray: [INFORMATION.CHECK_SPACE_INFO.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.CHECK_SPACE_INFO.DESCRIPTION}
      element={
        <LeftTimeInformationBox
          title={spaceInfo.name}
          openDate={{ date, time }}
          leftTime={formatTimer(leftTime)}
        />
      }
      onNextButtonClick={() => onNext(JSON.stringify(spaceInfo))}
    />
  );
};

export default CheckSpaceInfoElement;
