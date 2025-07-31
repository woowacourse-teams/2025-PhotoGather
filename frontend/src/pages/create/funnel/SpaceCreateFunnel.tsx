import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import type { SpaceCreateInfo } from '../../../types/space.type';
import DateInput from '../funnelElements/DateInput';
import NameInput from '../funnelElements/NameInput';
import TimeInput from '../funnelElements/TimeInput';
import * as S from './SpaceCreateFunnel.styles';

const STEP_LIST = ['name', 'date', 'time', 'check', 'complete'] as const;
type STEP = (typeof STEP_LIST)[number];

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceCreateInfo>({
    name: '',
    openedAt: '',
  });
  const currentStep = STEP_LIST.findIndex((oneStep) => oneStep === step) + 1;

  return (
    <S.Wrapper>
      <ProgressBar currentStep={currentStep} maxStep={STEP_LIST.length} />
      <S.ContentContainer>
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
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
