import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import DateInputElement from '../funnelElements/DateInputElement';
import FetchElement from '../funnelElements/FetchElement';
import NameInputElement from '../funnelElements/NameInputElement';
import TimeInputElement from '../funnelElements/TimeInputElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST = ['name', 'date', 'time', 'check'] as const;
const STEP_LIST = [...PROGRESS_STEP_LIST, 'complete', 'fetch'] as const;
type STEP = (typeof STEP_LIST)[number];

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceFunnelInfo>({
    name: '',
    date: '',
    time: '',
  });

  const { navigateToNext } = useFunnelHistory<STEP>(step, setStep);

  const goNextStep = (nextStep: STEP) => {
    navigateToNext(nextStep);
    setStep(nextStep);
  };

  const currentStep =
    PROGRESS_STEP_LIST.findIndex((oneStep) => oneStep === step) + 1;

  return (
    <S.Wrapper>
      {step !== 'fetch' && (
        <>
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
        </>
      )}
      <S.ContentContainer>
        {step === 'name' && (
          <NameInputElement
            onNext={(name) => {
              goNextStep('date');
              setSpaceInfo((prev) => ({ ...prev, name }));
            }}
            initialValue={spaceInfo.name}
          />
        )}
        {step === 'date' && (
          <DateInputElement
            onNext={(date) => {
              goNextStep('time');
              setSpaceInfo((prev) => ({ ...prev, date }));
            }}
            initialValue={spaceInfo.date}
          />
        )}
        {step === 'time' && (
          <TimeInputElement
            date={spaceInfo.date}
            onNext={(time) => {
              goNextStep('check');
              setSpaceInfo((prev) => ({ ...prev, time }));
            }}
            initialValue={spaceInfo.time}
          />
        )}
        {step === 'check' && (
          <CheckSpaceInfoElement
            spaceInfo={spaceInfo}
            onNext={() => goNextStep('fetch')}
          />
        )}
        {step === 'fetch' && (
          <FetchElement spaceInfo={spaceInfo} onNext={() => {}} />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
