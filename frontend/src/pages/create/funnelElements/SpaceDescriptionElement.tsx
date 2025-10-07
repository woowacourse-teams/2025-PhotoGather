import { useState } from 'react';
import TextareaInput from '../../../components/@common/inputs/textareaInput/TextareaInput';
import { CONSTRAINTS } from '../../../constants/constraints';
import type { FunnelElementProps } from '../../../types/funnel.type';
import { calculateValidLength } from '../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../validators/createErrorMessageWithValidators';
import { funnelValidators } from '../funnel/funnel.validators';
import FunnelBasePage from '../funnel/funnelBasePage/FunnelBasePage';

const SpaceDescriptionElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [description, setDescription] = useState(initialValue);
  const validLength = calculateValidLength(description);
  const { isError, errorMessage } = createErrorMessageWithValidators({
    value: description,
    validators: [funnelValidators.description],
  });
  const isDisabled = isError;

  return (
    <FunnelBasePage
      title="스페이스의 설명을 작성해주세요"
      description="내 스페이스에 대한 정보를 알려주세요."
      element={
        <TextareaInput
          isRequired={false}
          validLength={validLength}
          label="스페이스 설명"
          placeholder="매일 1시부터 6시까지 상주합니다."
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.DESCRIPTION_MAX_LENGTH}
        />
      }
      onNextButtonClick={() => onNext(description)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default SpaceDescriptionElement;
