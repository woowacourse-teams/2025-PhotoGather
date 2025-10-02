import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiamondImg as diamondImage } from '../../../@assets/images';
import StepProgressBar from '../../../components/@common/progressBar/step/StepProgressBar';
import { ROUTES } from '../../../constants/routes';
import useConfirmBeforeRefresh from '../../../hooks/@common/useConfirmBeforeRefresh';
import useAgreements from '../../../hooks/domain/auth/useAgreements';
import useAuthConditionTasks from '../../../hooks/domain/auth/useAuthConditionTasks';
import useFormFunnel from '../../../hooks/useFormFunnel';
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
  isInboxEnabled: true,
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const { handleAgree, isAgree, loadingAgreements } = useAgreements();
  const needsAgreement = !isAgree;

  const {
    Step,
    form: spaceInfo,
    updateFormData: updateSpaceInfo,
    funnelStep,
    goNextWithData,
    setFunnelStep,
  } = useFormFunnel<STEP, SpaceFunnelInfo>('name', initialFunnelValue);
  useEffect(() => {
    if (!loadingAgreements && needsAgreement) setFunnelStep('agreement');
  }, [needsAgreement, loadingAgreements, setFunnelStep]);

  const PROGRESS_STEP_LIST: STEP[] = [
    'name',
    'date',
    'accessType',
    'inbox',
    'check',
  ];
  const currentStep =
    PROGRESS_STEP_LIST.findIndex((oneStep) => oneStep === funnelStep) + 1;

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
        <Step name="agreement">
          <AgreementElement
            value={
              spaceInfo.agreements ?? {
                agreedToService: false,
                agreedToPrivacy: false,
              }
            }
            onChange={(agreements) => {
              updateSpaceInfo({ agreements });
            }}
            onNext={(agreements) => {
              goNextWithData('name', { agreements });
            }}
          />
        </Step>
        <Step name="name">
          <NameInputElement
            onNext={(name) => {
              goNextWithData('date', { name });
            }}
            initialValue={spaceInfo.name}
          />
        </Step>
        <Step name="date">
          <ImmediateOpenElement
            onNext={({ date, time, isImmediateOpen }) => {
              goNextWithData('accessType', {
                date,
                time,
                isImmediateOpen: isImmediateOpen ?? false,
              });
            }}
            initialValue={{
              date: spaceInfo.date,
              time: spaceInfo.time,
              isImmediateOpen: spaceInfo.isImmediateOpen,
            }}
          />
        </Step>
        <Step name="accessType">
          <AccessTypeElement
            onNext={(accessType) => {
              goNextWithData('inbox', { accessType });
            }}
            initialValue={spaceInfo.accessType}
          />
        </Step>
        <Step name="inbox">
          <InboxElement
            onNext={(isInboxEnabled) => {
              goNextWithData('check', { isInboxEnabled });
            }}
            initialValue={spaceInfo.isInboxEnabled}
          />
        </Step>
        <Step name="check">
          <CheckSpaceInfoElement
            spaceInfo={spaceInfo}
            onNext={(isImmediateOpen) => {
              updateSpaceInfo({ isImmediateOpen });
              handleAgree();
            }}
          />
        </Step>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
