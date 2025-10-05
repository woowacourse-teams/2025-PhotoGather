import { useState } from 'react';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import PhotoUploadButton from '../../../components/specific/photoUploadButton/PhotoUploadButton';
import * as S from './SpaceEditPage.styles';

const SpaceEditPage = () => {
  const [spaceInfo, setSpaceInfo] = useState({
    name: '',
    description: '',
  });
  const changeSpaceInfo = (key: keyof typeof spaceInfo, value: string) => {
    setSpaceInfo({
      ...spaceInfo,
      [key]: value,
    });
  };
  return (
    <S.Wrapper>
      <S.Title>스페이스 정보 수정</S.Title>
      <S.Form>
        <PhotoUploadButton />
        <TextInput
          validLength={0}
          label="스페이스 이름"
          placeholder="전시명을 입력해주세요."
          value={spaceInfo.name}
          onChange={(e) => changeSpaceInfo('name', e.target.value)}
          errorMessage={''}
          maxCount={0}
        />
        <TextareaInput
          validLength={0}
          label="스페이스 설명"
          value={spaceInfo.description}
          onChange={(e) => changeSpaceInfo('description', e.target.value)}
          errorMessage={''}
          maxCount={0}
        />
      </S.Form>
    </S.Wrapper>
  );
};

export default SpaceEditPage;
