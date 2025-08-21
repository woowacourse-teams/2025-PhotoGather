import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
import ComingSoonBox from '../../../components/comingSoonBox/ComingSoonBox';
import DashboardBox from '../../../components/dashboardBox/DashboardBox';
import { ROUTES } from '../../../constants/routes';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import { theme } from '../../../styles/theme';
import * as S from './DashboardPage.styles';

const DashboardPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const navigate = useNavigate();

  const handleModifyButton = () => {
    if (spaceCode) {
      navigate(ROUTES.MANAGER.SETTING(spaceCode));
    }
  };

  return (
    <S.Wrapper>
      <S.Title>스페이스 관리</S.Title>
      <S.DashboardContainer>
        <DashboardBox
          title="스페이스 용량"
          description="23.45MB / 100MB"
          style={{
            height: '160px',
          }}
        />
        <S.DashboardInfoContainer>
          <DashboardBox title="참여한 게스트" description="8명" />
          <DashboardBox title="모은 사진들" description="130장" />
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
