import { useState } from 'react';
import DateTimeInput from '../../../components/@common/dateTimeInput/DateTimeInput';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

const DateInputElement = ({
  onNext,
  initialValue = '',
}: FunnelElementProps) => {
  const [date, setDate] = useState(initialValue);
  const isDisabled = date.length === 0;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todayDateString = new Date().toISOString().split('T')[0];
    const selected = e.target.value;
    if (selected < todayDateString) {
      alert('오늘 이전 날짜는 선택할 수 없습니다.');
      return;
    }
    setDate(selected);
  };

  return (
    <FunnelBasePage
      title={{
        text: '스페이스를 언제부터 열까요?',
        highlightTextArray: ['언제부터'],
      }}
      description="선택한 시점부터 24시간 동안 열려요."
      element={
        <DateTimeInput
          inputType="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleDateChange}
          data-testid="date-input"
        />
      }
      handleNextButtonClick={() => onNext(date)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default DateInputElement;
