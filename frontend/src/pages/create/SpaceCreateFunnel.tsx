import { useState } from 'react';
import type { SpaceCreateInfo } from '../../types/space.type';
import DateInput from './date/DateInput';
import NameInput from './name/NameInput';
import TimeInput from './time/TimeInput';

type STEP = 'name' | 'date' | 'time' | 'check' | 'complete';

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceCreateInfo>({
    name: '',
    openedAt: '',
  });

  return (
    <div>
      {step === 'name' && (
        <NameInput
          onNext={(data) => {
            setStep('date');
            setSpaceInfo((prev) => ({ ...prev, name: data }));
          }}
        />
      )}
      {step === 'date' && (
        <DateInput
          onNext={(data) => {
            setStep('time');
            setSpaceInfo((prev) => ({ ...prev, date: data }));
          }}
        />
      )}
      {step === 'time' && (
        <TimeInput
          onNext={(data) => {
            setStep('check');
            setSpaceInfo((prev) => ({ ...prev, time: data }));
          }}
        />
      )}
      {step === 'check' && (
        <div>
          <p>스페이스 정보를 확인해 주세요.</p>
          <p>{JSON.stringify(spaceInfo)}</p>
        </div>
      )}
    </div>
  );
};

export default SpaceCreateFunnel;
