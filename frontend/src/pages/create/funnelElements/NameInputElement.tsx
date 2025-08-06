import { useState } from 'react';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

const NameInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [name, setName] = useState(initialValue);
  const isError = name.length > 10;
  const isDisabled = isError || name.length === 0;

  return (
    <FunnelBasePage
      title={{
        text: '스페이스 이름을 정해볼까요?',
        highlightTextArray: ['이름'],
      }}
      description="추억을 담을 공간의 이름을 작성해주세요."
      element={
        <TextInput
          maxCount={10}
          value={name}
          placeholder="나만의 스페이스"
          onChange={(e) => setName(e.target.value)}
          errorMessage={isError ? '유효하지 않은 이름입니다.' : ''}
        />
      }
      handleNextButtonClick={() => onNext(name)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default NameInputElement;
