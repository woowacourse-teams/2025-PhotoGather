import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiamondImg as diamondImage } from '../../../@assets/images';
import StepProgressBar from '../../../components/progressBar/step/StepProgressBar';
import { ROUTES } from '../../../constants/routes';
import useAuthConditionTasks from '../../../hooks/@common/useAuthConditionTasks';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useAgreements from '../../../hooks/domain/useAgreements';
import useFunnelHistory from '../../../hooks/useFunnelHistory';
import type { SpaceFunnelInfo } from '../../../types/space.type';
import AccessTypeElement from '../funnelElements/accessTypeElement/AccessTypeElement';
import AgreementElement from '../funnelElements/agreementElement/AgreementElement';
import CheckSpaceInfoElement from '../funnelElements/checkSpaceInfoElement/CheckSpaceInfoElement';
import ImmediateOpenElement from '../funnelElements/immediateOpenElement/ImmediateOpenElement';
import InboxElement from '../funnelElements/inboxElement/InboxElement';
import NameInputElement from '../funnelElements/NameInputElement';
import * as S from './SpaceCreateFunnel.styles';

type STEP = 'agreement' | 'name' | 'date' | 'accessType' | 'inbox' | 'check';

const initialFunnelValue: SpaceFunnelInfo = {
  agreements: null,
  name: '',
  date: '',
  time: '',
  isImmediateOpen: null,
  accessType: 'PUBLIC',
  isUsingInbox: true,
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const { handleAgree, isAgree, loadingAgreements } = useAgreements();
  const needsAgreement = !isAgree;
  const PROGRESS_STEP_LIST: STEP[] = [
    'name',
    'date',
    'accessType',
    'inbox',
    'check',
  ];
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
              goNextStep('accessType');
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
        {step === 'accessType' && (
          <AccessTypeElement
            onNext={(accessType) => {
              goNextStep('inbox');
              setSpaceInfo((prev) => ({
                ...prev,
                accessType: accessType,
              }));
            }}
            initialValue={spaceInfo.accessType}
          />
        )}
        {step === 'inbox' && (
          <InboxElement
            onNext={(isUsingInbox) => {
              goNextStep('check');
              setSpaceInfo((prev) => ({
                ...prev,
                inbox: isUsingInbox,
              }));
            }}
            initialValue={spaceInfo.isUsingInbox}
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
