import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
import ComingSoonBox from '../../../components/comingSoonBox/ComingSoonBox';
import DashboardBox from '../../../components/dashboardBox/DashboardBox';
import DonutGraph from '../../../components/donutGraph/DonutGraph';
import { ROUTES } from '../../../constants/routes';
import useSpaceCapacity from '../../../hooks/useSpaceCapacity';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import useSpaceInfo from '../../../hooks/useSpaceInfo';
import { theme } from '../../../styles/theme';
import * as S from './DashboardPage.styles';

const DashboardPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const { spaceInfo } = useSpaceInfo(spaceCode || '');
  const { capacity } = useSpaceCapacity(spaceCode || '');
  const navigate = useNavigate();

  const handleModifyButton = () => {
    if (spaceCode) {
      navigate(ROUTES.MANAGER.SETTING(spaceCode));
    }
  };

  const bytesToMB = (bytes: number): number => {
    return Number((bytes / (1024 * 1024)).toFixed(2));
  };

  const usedMB = capacity ? bytesToMB(capacity.usedCapacity) : 0;
  const maxMB = capacity ? bytesToMB(capacity.maxCapacity) : 10240;

  return (
    <S.Wrapper>
      <S.Title>스페이스 관리</S.Title>
      <S.DashboardContainer>
        <DashboardBox
          title="스페이스 용량"
          description={`${usedMB}MB / ${maxMB}MB`}
        >
          <DonutGraph value={usedMB} maxValue={maxMB} width={80} height={80} />
        </DashboardBox>
        <S.DashboardInfoContainer>
          <DashboardBox
            title="참여한 게스트"
            description={
              spaceInfo?.guestCount ? `${spaceInfo.guestCount}명` : '0명'
            }
          />
          <DashboardBox
            title="모은 사진들"
            description={
              spaceInfo?.photoCount ? `${spaceInfo.photoCount}장` : '0장'
            }
          />
        </S.DashboardInfoContainer>
      </S.DashboardContainer>
      <ComingSoonBox title="Coming Soon" />
      <S.ModifyButtonContainer>
        <S.ModifyButton onClick={handleModifyButton}>
          스페이스 정보 수정
          <EditIcon fill={theme.colors.white} width={16} />
        </S.ModifyButton>
      </S.ModifyButtonContainer>
    </S.Wrapper>
  );
};

export default DashboardPage;
