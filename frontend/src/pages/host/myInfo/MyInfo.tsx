import { useContext } from 'react';
import Button from '../../../components/@common/buttons/button/Button';
import { UserContext } from '../../../contexts/UserContext';
import useCommonAuthActions from '../../../hooks/domain/auth/useCommonAuthActions';
import { Thumbnail } from '../../MainPage.common.styles';
import * as S from './MyInfo.styles';

const MyInfo = () => {
  const userInfo = useContext(UserContext);
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
        <Thumbnail src={userInfo?.pictureUrl ?? ''} alt={userInfo?.name} />
        <S.Name>{userInfo?.name}</S.Name>
      </S.ProfileContainer>
      <Button variant="tertiary" text="로그아웃" onClick={handleLogout} />
    </S.Wrapper>
  );
};

export default MyInfo;
