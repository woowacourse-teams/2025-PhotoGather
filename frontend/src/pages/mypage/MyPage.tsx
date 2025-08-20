import HighlightText from '../../components/@common/highlightText/HighlightText';
import Profile from '../../components/profile/Profile';
import { profileImage } from '../logout/LogoutPage';
import * as S from './MyPage.styles';

const MyPage = () => {
  return (
    <S.Wrapper>
      <Profile profileImage={profileImage} name={'이름'} />
      <S.CreateSpaceButton>
        <HighlightText
          text="＋ 스페이스 생성"
          highlightTextArray={['＋']}
          highlightColorStyle="primary60"
          textColorStyle="white"
          fontStyle="bodyRegular"
        />
      </S.CreateSpaceButton>
    </S.Wrapper>
  );
};

export default MyPage;
