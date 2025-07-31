import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import type { SpaceCreateInfo } from '../../../types/space.type';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import DateInputElement from '../funnelElements/DateInputElement';
import NameInputElement from '../funnelElements/NameInputElement';
import TimeInputElement from '../funnelElements/TimeInputElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST = ['name', 'date', 'time', 'check'] as const;
const STEP_LIST = [...PROGRESS_STEP_LIST, 'complete'] as const;
type STEP = (typeof STEP_LIST)[number];

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceCreateInfo>({
    name: '',
    openedAt: '',
  });
  const currentStep =
    PROGRESS_STEP_LIST.findIndex((oneStep) => oneStep === step) + 1;

  return (
    <S.Wrapper>
      <ProgressBar
        currentStep={currentStep}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer>
        <S.IconContainer>
          <S.Icon src={diamondImage} alt="다이아몬드 이미지" />
          <S.UnderBar />
        </S.IconContainer>
      </S.TopContainer>
      <S.ContentContainer>
        {step === 'name' && (
          <NameInputElement
            onNext={(data) => {
              setStep('date');
              setSpaceInfo((prev) => ({ ...prev, name: data }));
            }}
          />
        )}
        {step === 'date' && (
          <DateInputElement
            onNext={(data) => {
              setStep('time');
              setSpaceInfo((prev) => ({ ...prev, date: data }));
            }}
          />
        )}
        {step === 'time' && (
          <TimeInputElement
            onNext={(data) => {
              setStep('check');
              setSpaceInfo((prev) => ({ ...prev, time: data }));
            }}
          />
        )}
        {step === 'check' && (
          <CheckSpaceInfoElement
            spaceInfo={spaceInfo}
            onNext={(data) => alert(data)}
          />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
