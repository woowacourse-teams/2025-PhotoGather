import LeftTimeInformationBox from '../../../components/leftTimeInformationBox/LeftTimeInformationBox';
import useLeftTimer from '../../../hooks/@common/useTimer';
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
  const { leftTime } = useLeftTimer({ openedAt });

  return (
    <FunnelBasePage
      title={{
        text: '스페이스 정보를 확인해 주세요.',
        highlightTextArray: ['스페이스 정보'],
      }}
      description="완료를 누르면 곧바로 링크가 발급돼요."
      element={
        <LeftTimeInformationBox
          title={spaceInfo.name}
          openDate={{ date, time }}
          leftTime={formatTimer(leftTime)}
        />
      }
      handleNextButtonClick={() => onNext(JSON.stringify(spaceInfo))}
    />
  );
};

export default CheckSpaceInfoElement;
