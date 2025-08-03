import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import { parseIsoStringFromDateTime } from '../../../utils/parseIsoStringFromDateTime';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import DateInputElement from '../funnelElements/DateInputElement';
import FetchElement from '../funnelElements/FetchElement';
import NameInputElement from '../funnelElements/NameInputElement';
import TimeInputElement from '../funnelElements/TimeInputElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST = ['name', 'date', 'time', 'check'] as const;
const STEP_LIST = [...PROGRESS_STEP_LIST, 'complete', 'fetch'] as const;
type STEP = (typeof STEP_LIST)[number];

interface SpaceFunnelInfo {
  name: string;
  date: string;
  time: string;
}

const SpaceCreateFunnel = () => {
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] = useState<SpaceFunnelInfo>({
    name: '',
    date: '',
    time: '',
  });

  const { navigateToNext } = useFunnelHistory<STEP>(step, setStep);

  const goNextStep = (nextStep: STEP, data: Partial<SpaceFunnelInfo>) => {
    setSpaceInfo((prev) => ({ ...prev, ...data }));
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
            onNext={(name) => goNextStep('date', { name })}
            initialValue={spaceInfo.name}
          />
        )}
        {step === 'date' && (
          <DateInputElement
            onNext={(date) => goNextStep('time', { date })}
            initialValue={spaceInfo.date}
          />
        )}
        {step === 'time' && (
          <TimeInputElement
            date={spaceInfo.date}
            onNext={(time) => goNextStep('check', { time })}
            initialValue={spaceInfo.time}
          />
        )}
        {step === 'check' && (
          <CheckSpaceInfoElement
            spaceInfo={{
              name: spaceInfo.name,
              openedAt: parseIsoStringFromDateTime(
                spaceInfo.date,
                spaceInfo.time,
              ),
              password: '',
            }}
            onNext={() => {
              navigateToNext('fetch');
              setStep('fetch');
            }}
          />
        )}
        {step === 'fetch' && (
          <FetchElement
            spaceInfo={{
              name: spaceInfo.name,
              openedAt: parseIsoStringFromDateTime(
                spaceInfo.date,
                spaceInfo.time,
              ),
              password: '',
            }}
            onNext={() => {}}
          />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
