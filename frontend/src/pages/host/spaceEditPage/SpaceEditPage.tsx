import EditForm from '../../../components/specific/editForm/EditForm';
import * as S from './SpaceEditPage.styles';

const SpaceEditPage = () => {
  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
      <EditForm />
    </S.Wrapper>
  );
};

export default SpaceEditPage;
