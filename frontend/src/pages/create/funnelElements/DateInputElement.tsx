import { useState } from 'react';
import DateTimeInput from '../../../components/@common/inputs/DateTimeInput';
import { ERROR, INFORMATION } from '../../../constants/messages';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/FunnelBasePage/FunnelBasePage';

const DateInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [date, setDate] = useState(initialValue);
  const isDisabled = date.length === 0;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todayDateString = new Date(Date.now()).toISOString().split('T')[0];
    const selectedDate = e.target.value;
    if (selectedDate < todayDateString) {
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
          min={new Date().toISOString().split('T')[0]}
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
