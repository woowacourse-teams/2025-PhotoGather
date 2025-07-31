import LeftTimeInformationBox from '../../../components/leftTimeInformationBox/LeftTimeInformationBox';
import type { FunnelElementProps } from '../../../types/funnel.type';
import type { SpaceCreateInfo } from '../../../types/space.type';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

interface CheckSpaceInfoPageProps extends FunnelElementProps {
  spaceInfo: SpaceCreateInfo;
}

const CheckSpaceInfoPage = ({ spaceInfo }: CheckSpaceInfoPageProps) => {
  return (
    <FunnelBasePage
      title={{
        text: '스페이스 정보를 확인해 주세요.',
        highlightTextArray: ['스페이스 정보'],
      }}
      description="완료를 누르면 곧바로 링크가 발급돼요."
      element={
        // TODO: 안의 인자를 바꾸어야 함
        <LeftTimeInformationBox
          title={spaceInfo.name}
          openDate="2025년 7월 13일 12시 30분"
          leftTime="00:00:00"
        />
      }
      handleNextButtonClick={() => console.dir(spaceInfo)}
    />
  );
};

export default CheckSpaceInfoPage;
