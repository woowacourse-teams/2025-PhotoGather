import ConfirmModal from '../../components/@common/modal/confirmModal/ConfirmModal';
import Profile from '../../components/profile/Profile';
import { useOverlay } from '../../contexts/OverlayProvider';
import useKakaoAuth from '../../hooks/domain/useKakaoAuth';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './LogoutPage.styles';

// TODO: 기능 구현 후 제거
export const profileImage =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800';

const LogoutPage = () => {
  const overlay = useOverlay();
  const { handleLogout: logout } = useKakaoAuth();

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
      <Profile profileImage={profileImage} name={'이름'} />
      <S.LogoutButtonContainer>
        <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
      </S.LogoutButtonContainer>
    </S.Wrapper>
  );
};

export default LogoutPage;
