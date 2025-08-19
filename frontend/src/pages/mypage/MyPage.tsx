import { profileImage } from '../logout/LogoutPage';
import * as S from './MyPage.styles';

const MyPage = () => {
  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <S.ProfileImageContainer>
          <S.ProfileImage src={profileImage} alt="profile" />
        </S.ProfileImageContainer>
        <S.Name>밍고의매복사랑니</S.Name>
        <S.CreateSpaceButton>+ 스페이스 생성</S.CreateSpaceButton>
      </S.ProfileContainer>
    </S.Wrapper>
  );
};

export default MyPage;
