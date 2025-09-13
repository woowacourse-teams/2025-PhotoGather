import diamondImage from '@assets/images/diamond.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepProgressBar from '../../../components/progressBar/step/StepProgressBar';
import { ROUTES } from '../../../constants/routes';
import useAuthConditionTasks from '../../../hooks/@common/useAuthConditionTasks';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useAgreements from '../../../hooks/domain/useAgreements';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import AgreementElement from '../funnelElements/agreementElement/AgreementElement';
import CheckSpaceInfoElement from '../funnelElements/checkSpaceInfoElement/CheckSpaceInfoElement';
import ImmediateOpenElement from '../funnelElements/immediateOpenElement/ImmediateOpenElement';
import NameInputElement from '../funnelElements/NameInputElement';
import PublicTypeElement from '../funnelElements/publicTypeElement/PublicTypeElement';
import * as S from './SpaceCreateFunnel.styles';

type STEP = 'agreement' | 'name' | 'date' | 'publicType' | 'check';

const initialFunnelValue: SpaceFunnelInfo = {
  name: '',
  date: '',
  time: '',
  publicType: 'PUBLIC',
  isImmediateOpen: null,
  agreements: null,
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const { handleAgree, isAgree, loadingAgreements } = useAgreements();
  const needsAgreement = !isAgree;
  const PROGRESS_STEP_LIST: STEP[] = ['name', 'date', 'publicType', 'check'];
  const [step, setStep] = useState<STEP>('name');
  useEffect(() => {
    if (!loadingAgreements && needsAgreement) setStep('agreement');
  }, [needsAgreement, loadingAgreements]);

  const [spaceInfo, setSpaceInfo] =
    useState<SpaceFunnelInfo>(initialFunnelValue);
  const { navigateToNext } = useFunnelHistory<STEP>(step, setStep);

  const goNextStep = (nextStep: STEP) => {
    navigateToNext(nextStep);
    setStep(nextStep);
  };

  const currentStep =
    PROGRESS_STEP_LIST.findIndex((oneStep) => oneStep === step) + 1;

  const navigate = useNavigate();
  useAuthConditionTasks({ taskWhenNoAuth: () => navigate(ROUTES.MAIN) });

  return (
    <S.Wrapper>
      <StepProgressBar
        currentStep={currentStep}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer>
        <S.IconContainer>
          <S.Icon src={diamondImage} alt="다이아몬드 이미지" />
        </S.IconContainer>
      </S.TopContainer>
      <S.ContentContainer>
        {step === 'agreement' && (
          <AgreementElement
            value={
              spaceInfo.agreements ?? {
                agreedToService: false,
                agreedToPrivacy: false,
              }
            }
            onChange={(agreements) => {
              setSpaceInfo((prev) => ({ ...prev, agreements }));
            }}
            onNext={(agreement) => {
              setSpaceInfo((prev) => ({ ...prev, agreement }));
              goNextStep('name');
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
              goNextStep('publicType');
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
        {step === 'publicType' && (
          <PublicTypeElement
            onNext={(publicType) => {
              goNextStep('check');
              setSpaceInfo((prev) => ({
                ...prev,
                publicType,
              }));
            }}
            initialValue={spaceInfo.publicType}
          />
        )}
        {step === 'check' && (
          <CheckSpaceInfoElement
            spaceInfo={spaceInfo}
            onNext={(isImmediateOpen) => {
              setSpaceInfo((prev) => ({ ...prev, isImmediateOpen }));
              handleAgree();
            }}
          />
        )}
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
