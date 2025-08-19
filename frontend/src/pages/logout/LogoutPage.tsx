import ConfirmModal from '../../components/@common/modal/confirmModal/ConfirmModal';
import { useOverlay } from '../../contexts/OverlayProvider';
import { track } from '../../utils/googleAnalytics/track';
import * as S from './LogoutPage.styles';

// TODO: 기능 구현 후 제거
export const profileImage =
  'https://mblogthumb-phinf.pstatic.net/MjAyMTA0MTlfOTMg/MDAxNjE4ODIyODEyNjIy.PlBJ_yLT_0RQxDVzmDuEWrIioxajvdDqzG3nVK3qJQ0g.Ya7t_4dySMXtr2YT-p326Z1odr5MVxg_rBKZBPtHKp8g.JPEG.dochiqueens/april-blog-1.jpg?type=w800';

const LogoutPage = () => {
  const overlay = useOverlay();

  const handleLogout = async () => {
    console.log('로그아웃');
    const confirmResult = await overlay(
      // TODO: 설정 PR 머지 후 주석 제거
      <ConfirmModal
        // title="로그아웃 할까요?"
        confirmText="삭제"
        cancelText="취소"
        // mode="error"
      />,
      {
        clickOverlayClose: true,
      },
    );
    if (!confirmResult) return;

    // TODO: 로그아웃 API 호출
    track.button('logout_button', {
      page: 'logout',
      section: 'logout',
      action: 'logout',
    });
  };

  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <S.ProfileImageContainer>
          <S.ProfileImage src={profileImage} alt="profile" />
        </S.ProfileImageContainer>
        <S.Name>밍고의매복사랑니</S.Name>
      </S.ProfileContainer>
      <S.LogoutButtonContainer>
        <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
      </S.LogoutButtonContainer>
    </S.Wrapper>
  );
};

export default LogoutPage;
