import { useState } from 'react';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import { ERROR, INFORMATION } from '../../../constants/messages';
import type { FunnelElementProps } from '../../../types/funnel.type';
import { calculateKSTDate } from '../../../utils/calculateKSTDate';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

const DateInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [date, setDate] = useState(initialValue);
  const isDisabled = date.length === 0;
  const { kstDateString } = calculateKSTDate();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate < kstDateString) {
      alert(ERROR.INPUT.DATE);
      return;
    }
    setDate(selectedDate);
  };

  return (
    <FunnelBasePage
      title={{
        text: INFORMATION.DATE_INPUT.TITLE.TEXT,
        highlightTextArray: [INFORMATION.DATE_INPUT.TITLE.HIGHLIGHT_TEXT],
      }}
      description={INFORMATION.DATE_INPUT.DESCRIPTION}
      element={
        <DateTimeInput
          inputType="date"
          value={date}
          min={kstDateString}
          onChange={handleDateChange}
          data-testid="date-input"
        />
      }
      onNextButtonClick={() => onNext(date)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default DateInputElement;
