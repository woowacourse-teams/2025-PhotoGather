import { ReactComponent as EditIcon } from '@assets/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
import DashboardBox from '../../../components/dashboardBox/DashboardBox';
import { ROUTES } from '../../../constants/routes';
import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import * as S from './DashboardPage.styles';

const DashboardPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();
  const navigate = useNavigate();

  const handleSettingsButton = () => {
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
          isClosed={false}
          style={{
            height: '160px',
          }}
        />
        <S.DashboardInfoContainer>
          <DashboardBox
            title="참여한 게스트"
            description="8명"
            isClosed={false}
          />
          <DashboardBox
            title="모은 사진들"
            description="130장"
            isClosed={false}
          />
        </S.DashboardInfoContainer>
      </S.DashboardContainer>

      <S.ContentContainer>
        <DashboardBox title="Coming Soon" isClosed={true} />
        <S.SettingsButtonContainer>
          <S.SettingsButton onClick={handleSettingsButton}>
            스페이스 정보 수정
            <EditIcon />
          </S.SettingsButton>
        </S.SettingsButtonContainer>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default DashboardPage;
