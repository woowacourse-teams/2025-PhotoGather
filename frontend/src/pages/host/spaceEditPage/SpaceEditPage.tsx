import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import * as S from './SpaceEditPage.styles';

const SpaceEditPage = () => {
  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
      <S.Form>
        <PhotoUploadButton />
      </S.Form>
    </S.Wrapper>
  );
};

export default SpaceEditPage;
