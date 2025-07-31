import { useState } from 'react';
import DateTimeInput from '../../../components/@common/dateTimeInput/DateTimeInput';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

const TimeInputElement = ({ onNext }: FunnelElementProps) => {
  const [time, setTime] = useState<string>('');
  const isDisabled = time.length === 0;

  return (
    <FunnelBasePage
      title={{
        text: '스페이스를 몇시부터 열까요?',
        highlightTextArray: ['몇시부터'],
      }}
      description="선택한 시점부터 24시간 동안 열려요."
      element={
        <DateTimeInput
          inputType="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          data-testid="time-input"
        />
      }
      handleNextButtonClick={() => onNext(time)}
      nextButtonDisabled={isDisabled}
    />
  );
};

export default TimeInputElement;
