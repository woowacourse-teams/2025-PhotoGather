import { useState } from 'react';
import type { FunnelElementProps } from '../../../types/funnel.type';

const DateInput = ({ onNext }: FunnelElementProps) => {
  const [date, setDate] = useState<string>('');

  return (
    <div>
      <p>스페이스를 언제부터 열까요?</p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="button" onClick={() => onNext(date)}>
        다음으로
      </button>
    </div>
  );
};

export default DateInput;
