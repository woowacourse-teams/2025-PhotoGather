import { useState } from 'react';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import { ERROR, INFORMATION } from '../../../constants/messages';
import type { FunnelElementProps } from '../../../types/funnel.type';
import { checkIsPastDateTime } from '../../../utils/checkIsPastDateTime';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

interface TimeInputElementProps extends FunnelElementProps {
  date: string;
}

const TimeInputElement = ({
  date,
  onNext,
  initialValue = '',
}: TimeInputElementProps) => {
  const [time, setTime] = useState(initialValue);
  const isError = checkIsPastDateTime(date, time);
  const isDisabled = time.length === 0 || isError;

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.TIME_INPUT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.TIME_INPUT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.TIME_INPUT.DESCRIPTION}
      element={
        <DateTimeInput
          inputType="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-testid="time-input"
          errorMessage={isError ? ERROR.INPUT.TIME : ''}
        />
      }
      onNextButtonClick={() => onNext(time)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default TimeInputElement;
