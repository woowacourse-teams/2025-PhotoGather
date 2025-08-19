import useSpaceCodeFromPath from '../../../hooks/useSpaceCodeFromPath';
import * as S from './SettingsPage.styles';

const SettingsPage = () => {
  const { spaceCode } = useSpaceCodeFromPath();

  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
    </S.Wrapper>
  );
};

export default SettingsPage;
