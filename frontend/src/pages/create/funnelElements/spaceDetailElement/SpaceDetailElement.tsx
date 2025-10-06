import type { FunnelElementProps } from '../../../../types/funnel.type';
import FunnelBasePage from '../../funnel/funnelBasePage/FunnelBasePage';
import * as S from './SpaceDetailElement.styles';

const SpaceDetailElement = ({ onNext }: FunnelElementProps<string>) => {
  return (
    <FunnelBasePage
      title="스페이스의 세부 정보를 입력해주세요"
      description="프로필 사진과 연락처 정보를 입력할 수 있어요."
      element={
        <S.Wrapper>
          <S.ImageUploadContainer>
            <S.ImagePreviewBox />
          </S.ImageUploadContainer>
          <S.InputContainer>
            <S.Label>이메일</S.Label>
            <S.Label>인스타그램</S.Label>
          </S.InputContainer>
        </S.Wrapper>
      }
      onNextButtonClick={() => onNext('구현중')}
    />
  );
};

export default SpaceDetailElement;
