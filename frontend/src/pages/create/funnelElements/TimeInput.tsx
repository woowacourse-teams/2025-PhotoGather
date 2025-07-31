import { useState } from 'react';
import type { FunnelElementProps } from '../../../types/funnel.type';

const TimeInput = ({ onNext }: FunnelElementProps) => {
  const [time, setTime] = useState<string>('');

  return (
    <div>
      <p>스페이스를 몇시부터 열까요?</p>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="button" onClick={() => onNext(time)}>
        다음으로
      </button>
    </div>
  );
};

export default TimeInput;
