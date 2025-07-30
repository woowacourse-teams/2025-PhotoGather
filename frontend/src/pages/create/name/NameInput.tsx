import { useState } from 'react';
import type { BaseFunnelPageProps } from '../../../types/funnel.type';

const NameInput = ({ onNext }: BaseFunnelPageProps) => {
  const [name, setName] = useState<string>('');

  return (
    <div>
      <p>스페이스 이름을 정해볼까요?</p>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <button type="button" onClick={() => onNext(name)}>
        다음으로
      </button>
    </div>
  );
};

export default NameInput;
