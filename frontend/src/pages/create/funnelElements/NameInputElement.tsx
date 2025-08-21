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
  const isOverLength = name.length > CONSTRAINTS.NAME_MAX_LENGTH;
  const isStartWithBlank = name.startsWith(' ');
  const isDisabled = isOverLength || isStartWithBlank || name.length === 0;

  const createNameErrorMessage = () => {
    if (isStartWithBlank) return ERROR.INPUT.NAME_BLANK;
    if (isOverLength) return ERROR.INPUT.NAME_LENGTH;
    return '';
  };

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
          errorMessage={createNameErrorMessage()}
        />
      }
      onNextButtonClick={() => onNext(name)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default NameInputElement;
