import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultProfileImg as defaultProfile } from '../../@assets/images';
import { authService } from '../../apis/services/auth.service';
import ConfirmModal from '../../components/@common/modal/confirmModal/ConfirmModal';
import Profile from '../../components/@common/profile/Profile';
import { ROUTES } from '../../constants/routes';
import { useOverlay } from '../../contexts/OverlayProvider';
import useAuthActions from '../../hooks/domain/auth/useAuthActions';
import useAuthConditionTasks from '../../hooks/domain/auth/useAuthConditionTasks';
import type { MyInfo } from '../../types/api.type';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './LogoutPage.styles';

const LogoutPage = () => {
  const overlay = useOverlay();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  useAuthConditionTasks({ taskWhenNoAuth: () => navigate(ROUTES.MAIN) });
  const { handleLogout: logout } = useAuthActions();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const response = await authService.status();
      setMyInfo(response.data ?? null);
    };
    setIsLoading(true);
    fetchAuthStatus();
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    const confirmResult = await overlay(
      <ConfirmModal
        title="로그아웃 할까요?"
        confirmText="확인"
        cancelText="취소"
        mode="error"
      />,
      {
        clickOverlayClose: true,
      },
    );
    if (!confirmResult) return;

    track.button('logout_button', {
      page: 'logout',
      section: 'logout',
      action: 'logout',
    });

    await logout();
  };

  return (
    <S.Wrapper>
      <Profile
        profileImage={
          isLoading || !myInfo?.pictureUrl ? defaultProfile : myInfo?.pictureUrl
        }
        name={isLoading || !myInfo?.name ? '이름' : myInfo?.name}
      />
      <S.LogoutButtonContainer>
        <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
      </S.LogoutButtonContainer>
    </S.Wrapper>
  );
};

export default LogoutPage;
