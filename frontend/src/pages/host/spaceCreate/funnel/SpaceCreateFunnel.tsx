import StepProgressBar from '../../../../components/@common/progressBar/step/StepProgressBar';
import useButtonTracking from '../../../../hooks/@common/useButtonTracking';
import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import type {
  CreateFunnelForm,
  CreateFunnelStep,
} from '../../../../types/funnel.type';
import SpaceDescriptionElement from '../funnelElements/SpaceDescriptionElement';
import SpaceNameElement from '../funnelElements/SpaceNameElement';
import SpaceCheckElement from '../funnelElements/spaceCheckElement/SpaceCheckElement';
import SpaceDetailElement from '../funnelElements/spaceDetailElement/SpaceDetailElement';
import SpaceVisibilityElement from '../funnelElements/spaceVisibilityElement/SpaceVisibilityElement';
import * as S from './SpaceCreateFunnel.styles';

const PROGRESS_STEP_LIST: readonly CreateFunnelStep[] = [
  'name',
  'accessType',
  'description',
  'detail',
  'check',
] as const;
const initialCreateFunnelForm: CreateFunnelForm = {
  name: '',
  description: '',
  visibility: 'PUBLIC',
  profileImage: [],
  email: '',
  instagram: '',
};

const SpaceCreateFunnel = () => {
  useConfirmBeforeRefresh();
  const { trackClick } = useButtonTracking({
    userType: 'host',
  });

  const Funnel = useFormFunnel<CreateFunnelStep, CreateFunnelForm>(
    'name',
    initialCreateFunnelForm,
  );
  const currentStepIndex = PROGRESS_STEP_LIST.indexOf(Funnel.funnelStep) + 1;

  const handleStepComplete = (
    fromStep: CreateFunnelStep,
    toStep: CreateFunnelStep,
    data?: Partial<CreateFunnelForm>,
  ) => {
    trackClick('space_create_funnel_step_complete', {
      page: '/space/create',
      fromStep,
      toStep,
      currentStepIndex,
      totalSteps: PROGRESS_STEP_LIST.length,
      hasData: !!data,
    });
  };

  return (
    <S.Wrapper>
      <StepProgressBar
        currentStep={currentStepIndex}
        maxStep={PROGRESS_STEP_LIST.length}
      />
      <S.TopContainer />
      <S.ContentContainer>
        <Funnel.Step name="name">
          <SpaceNameElement
            onNext={(name) => {
              handleStepComplete('name', 'accessType', { name });
              Funnel.goNextWithData('accessType', { name });
            }}
            initialValue={Funnel.form.name}
          />
        </Funnel.Step>
        <Funnel.Step name="accessType">
          <SpaceVisibilityElement
            onNext={(visibility) => {
              handleStepComplete('accessType', 'description', { visibility });
              Funnel.goNextWithData('description', { visibility });
            }}
            initialValue={Funnel.form.visibility}
          />
        </Funnel.Step>
        <Funnel.Step name="description">
          <SpaceDescriptionElement
            onNext={(description) => {
              handleStepComplete('description', 'detail', { description });
              Funnel.goNextWithData('detail', { description });
            }}
            initialValue={Funnel.form.description}
          />
        </Funnel.Step>
        <Funnel.Step name="detail">
          <SpaceDetailElement
            onNext={(detail) => {
              handleStepComplete('detail', 'check', { ...detail });
              Funnel.goNextWithData('check', { ...detail });
            }}
            initialValue={{
              profileImage: Funnel.form.profileImage,
              email: Funnel.form.email,
              instagram: Funnel.form.instagram,
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="check">
          <SpaceCheckElement createFunnelForm={Funnel.form} onNext={() => {}} />
        </Funnel.Step>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default SpaceCreateFunnel;
