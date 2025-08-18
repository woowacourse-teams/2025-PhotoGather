import diamondImage from '@assets/images/diamond.png';
import { useState } from 'react';
import ProgressBar from '../../../components/progressBar/ProgressBar';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import AgreementElement from '../funnelElements/agreementElement/AgreementElement';
import CheckSpaceInfoElement from '../funnelElements/CheckSpaceInfoElement';
import ImmediateOpenElement from '../funnelElements/immediateOpenElement/ImmediateOpenElement';
import NameInputElement from '../funnelElements/NameInputElement';
import * as S from './SpaceCreateFunnel.styles';

type STEP = 'agreement' | 'name' | 'date' | 'check';

const needsAgreement = true; //TODO: 추후 서버에서 받아온 값으로 교체해주어야 함

const PROGRESS_STEP_LIST: STEP[] = needsAgreement
  ? ['agreement', 'name', 'date', 'check']
  : ['name', 'date', 'check'];
const initialFunnelValue: SpaceFunnelInfo = {
  name: '',
  date: '',
  time: '',
  isImmediateOpen: null,
  agreements: null, //TODO: null인 경우 첫번째 생성 X
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const [step, setStep] = useState<STEP>(needsAgreement ? 'agreement' : 'name');
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
        {step === 'agreement' && (
          <AgreementElement
            onNext={(agreement) => {
              goNextStep('name');
              setSpaceInfo((prev) => ({ ...prev, agreement }));
            }}
          />
        )}
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
            onNext={(isImmediateOpen) => {
              setSpaceInfo((prev) => ({ ...prev, isImmediateOpen }));
            }}
          />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
