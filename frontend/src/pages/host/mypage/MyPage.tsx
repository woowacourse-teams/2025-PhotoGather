import Button from '../../../components/@common/buttons/button/Button';
import Thumbnail from '../../../components/@common/thumbnail/Thumbnail';
import useUserInfoContext from '../../../hooks/context/userInfoContext';
import useCommonAuthActions from '../../../hooks/domain/auth/useCommonAuthActions';
import * as S from './MyPage.styles';

const MyPage = () => {
  const userInfo = useUserInfoContext();
  const { handleLogout } = useCommonAuthActions();

  if (!userInfo) {
    return (
      <S.Wrapper>
        <S.Name>사용자 정보를 찾을 수 없습니다</S.Name>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <Thumbnail
          src={userInfo?.pictureUrl ?? 'invalid-url'}
          alt={userInfo?.name}
        />
        <S.Name>{userInfo?.name}</S.Name>
      </S.ProfileContainer>
      <Button variant="tertiary" text="로그아웃" onClick={handleLogout} />
    </S.Wrapper>
  );
};

export default MyPage;
