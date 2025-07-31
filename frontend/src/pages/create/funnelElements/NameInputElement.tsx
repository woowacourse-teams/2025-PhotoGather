import { useState } from 'react';
import Input from '../../../components/@common/input/Input';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

const NameInputElement = ({ onNext }: FunnelElementProps) => {
  const [name, setName] = useState('');
  const isError = name.length > 10;

  return (
    <FunnelBasePage
      title={{
        text: '스페이스 이름을 정해볼까요?',
        highlightTextArray: ['이름'],
      }}
      description="추억을 담을 공간의 이름을 작성해주세요."
      element={
        <Input
          maxCount={10}
          value={name}
          placeholder="나만의 스페이스"
          onChange={(e) => setName(e.target.value)}
          errorMessage={isError ? '10자가 초과되었습니다.' : ''}
        />
      }
      handleNextButtonClick={() => onNext(name)}
      nextButtonDisabled={isError}
    />
  );
};

export default NameInputElement;
