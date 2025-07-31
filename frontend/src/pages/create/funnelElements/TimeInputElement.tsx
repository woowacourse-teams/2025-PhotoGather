import { useState } from 'react';
import type { FunnelElementProps } from '../../../types/funnel.type';
import FunnelBasePage from '../funnel/funnelElementBase/FunnelElementBase';

const TimeInputElement = ({ onNext }: FunnelElementProps) => {
  const [time, setTime] = useState<string>('');

  return (
    <FunnelBasePage
      title={{
        text: '스페이스를 몇시부터 열까요?',
        highlightTextArray: ['몇시부터'],
      }}
      description="선택한 시점부터 24시간 동안 열려요."
      element={
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      }
      handleNextButtonClick={() => onNext(time)}
    />
  );
};

export default TimeInputElement;
