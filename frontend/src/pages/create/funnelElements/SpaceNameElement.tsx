import { useState } from 'react';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../constants/constraints';
import type { FunnelElementProps } from '../../../types/funnel.type';
import { calculateValidLength } from '../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../funnel/funnel.validators';
import FunnelBasePage from '../funnel/funnelBasePage/FunnelBasePage';

const SpaceNameElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [name, setName] = useState(initialValue);
  const validLength = calculateValidLength(name);
  const { isError, errorMessage } = createErrorMessageWithValidators({
    value: name,
    validators: [funnelValidators.name],
  });
  const isDisabled = isError || validLength === 0;

  return (
    <FunnelBasePage
      title="스페이스 이름을 정해주세요"
      description="추억을 담을 공간의 이름을 작성해주세요."
      element={
        <TextInput
          isRequired={false}
          validLength={validLength}
          label=""
          placeholder="전시명"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
        />
      }
      onNextButtonClick={() => onNext(name)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default SpaceNameElement;
