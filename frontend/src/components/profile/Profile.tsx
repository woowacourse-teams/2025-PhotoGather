import * as S from './Profile.styles';

interface ProfileProps {
  /** 사용자 프로필 이미지 */
  profileImage: string;
  /** 사용자 이름 */
  name: string;
}

const Profile = ({ profileImage, name }: ProfileProps) => {
  return (
    <S.Wrapper>
      <S.ProfileContainer>
        <S.ProfileImageContainer>
          <S.ProfileImage src={profileImage} alt={name} />
        </S.ProfileImageContainer>
        <S.Name>{name}</S.Name>
      </S.ProfileContainer>
    </S.Wrapper>
  );
};

export default Profile;
