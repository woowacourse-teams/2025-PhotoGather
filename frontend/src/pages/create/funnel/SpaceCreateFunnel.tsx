import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import FetchElement from '../funnelElements/FetchElement';
import ImmediateOpenElement from '../funnelElements/immediateOpenElement/ImmediateOpenElement';
import NameInputElement from '../funnelElements/NameInputElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST = ['name', 'date', 'check'] as const;
const STEP_LIST = [...PROGRESS_STEP_LIST, 'complete', 'fetch'] as const;
type STEP = (typeof STEP_LIST)[number];
const initialFunnelValue: SpaceFunnelInfo = {
  name: '',
  date: '',
  time: '',
  isImmediateOpen: null,
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const [step, setStep] = useState<STEP>('name');
  const [spaceInfo, setSpaceInfo] =
    useState<SpaceFunnelInfo>(initialFunnelValue);

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
          <ImmediateOpenElement
            onNext={({ date, time, isImmediateOpen }) => {
              goNextStep('check');
              setSpaceInfo((prev) => ({
                ...prev,
                date,
                time,
                isImmediateOpen: isImmediateOpen ?? false,
              }));
            }}
            initialValue={{
              date: spaceInfo.date,
              time: spaceInfo.time,
              isImmediateOpen: spaceInfo.isImmediateOpen,
            }}
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
