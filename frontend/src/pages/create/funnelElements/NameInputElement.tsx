import { useState } from 'react';
import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../constants/constraints';
import { ERROR, INFORMATION } from '../../../constants/messages';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

const NameInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [name, setName] = useState(initialValue);
  const isError = name.length > CONSTRAINTS.NAME_MAX_LENGTH;
  const isDisabled = isError || name.length === 0;

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.NAME_INPUT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.NAME_INPUT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.NAME_INPUT.DESCRIPTION}
      element={
        <TextInput
          maxCount={CONSTRAINTS.NAME_MAX_LENGTH}
          value={name}
          placeholder={INFORMATION.NAME_INPUT.PLACEHOLDER}
          onChange={(e) => setName(e.target.value)}
          errorMessage={isError ? ERROR.INPUT.NAME : ''}
        />
      }
      onNextButtonClick={() => onNext(name)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default NameInputElement;
