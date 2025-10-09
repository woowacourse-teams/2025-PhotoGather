import { useState } from 'react';
import TextareaInput from '../../../../components/@common/inputs/textareaInput/TextareaInput';
import { CONSTRAINTS } from '../../../../constants/constraints';
import { INFORMATION } from '../../../../constants/messages';
import type { FunnelElementProps } from '../../../../types/funnel.type';
import { calculateValidLength } from '../../../../utils/grapheme';
import { createErrorMessageWithValidators } from '../../../../validators/createErrorMessageWithValidators';
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
      title={INFORMATION.SPACE_CREATE.DESCRIPTION.TITLE}
      description={INFORMATION.SPACE_CREATE.DESCRIPTION.DESCRIPTION}
      element={
        <TextareaInput
          isRequired={false}
          validLength={validLength}
          label=""
          placeholder="매일 1시부터 6시까지 상주합니다."
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={errorMessage}
          maxCount={CONSTRAINTS.MAX_LENGTH.SPACE.DESCRIPTION}
        />
      }
      onNextButtonClick={() => onNext(description)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default SpaceDescriptionElement;
