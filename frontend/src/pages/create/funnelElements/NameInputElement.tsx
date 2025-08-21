import TextInput from '../../../components/@common/inputs/textInput/TextInput';
import { CONSTRAINTS } from '../../../constants/constraints';
import { ERROR, INFORMATION } from '../../../constants/messages';
import useGraphemeInput from '../../../hooks/@common/useGraphemeInput';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

const NameInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const { handleChange, validValue, validLength } = useGraphemeInput({
    initialValue,
  });
  const isError = validLength > CONSTRAINTS.NAME_MAX_LENGTH;
  const isDisabled = isError || validLength === 0;

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
          validLength={validLength}
          value={validValue}
          placeholder={INFORMATION.NAME_INPUT.PLACEHOLDER}
          onChange={handleChange}
          errorMessage={isError ? ERROR.INPUT.NAME : ''}
        />
      }
      onNextButtonClick={() => onNext(validValue)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default NameInputElement;
